import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import { editValidationSchema, registerValidationSchema } from '../Schema/userSchema.js';
import { errorMessage } from '../utils/error.js';
import { queryDatabase } from '../utils/utils.js';

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded.userId);
            }
        });
    });
};

export const getUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }
    
    try {
        const userId = await verifyToken(refreshToken , res);
        const userResults = await queryDatabase('SELECT role FROM user WHERE id = ?', [userId]);
        if (!userResults.length) return res.status(404).json({ error: 'User not found' });

        const artistResults = await queryDatabase('SELECT id AS artist_id FROM artist WHERE user_id = ?', [userId]);
                const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        res.status(200).json({
            accessToken,
            ...userResults[0],
            artist_id: artistResults.length ? artistResults[0].artist_id : null,
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};

export const registerUser = async (req, res) => {
    try {
        await registerValidationSchema.validate(req.body, { abortEarly: false });
        const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;

        const existingUser = await queryDatabase('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUser.length) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await queryDatabase('INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [first_name, last_name, email, hashedPassword, phone, dob, gender, address, role]);
        
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await queryDatabase('SELECT * FROM user WHERE email = ?', [email]);
        if (!results.length) return res.status(404).json({ error: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        const artistResults = await queryDatabase('SELECT id AS artist_id FROM artist WHERE user_id = ?', [user.id]);
        res.status(200).json({ message: 'Login successful', accessToken, ...user, artist_id: artistResults.length ? artistResults[0].artist_id : null });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const fetchUsers = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        const totalRecords = await queryDatabase('SELECT COUNT(*) AS total FROM user');
        const totalPages = Math.ceil(totalRecords[0].total / pageSize);
        const users = await queryDatabase('SELECT id, first_name, last_name, email, phone, dob, gender, address, role, created_at, updated_at FROM user LIMIT ? OFFSET ?', [parseInt(pageSize), parseInt(offset)]);
        
        res.status(200).json({
            data: users,
            currentPage: parseInt(page),
            pageSize: parseInt(pageSize),
            totalRecords: totalRecords[0].total,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await editValidationSchema.validate(req.body, { abortEarly: false });
        const { first_name, last_name, email, phone, dob, gender, address, role } = req.body;

        const result = await queryDatabase('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?', 
            [first_name, last_name, email, phone, dob, gender, address, role, id]);
        
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await queryDatabase('DELETE FROM user WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const fetchUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await queryDatabase('SELECT id, first_name, last_name, email, phone, dob, gender, address, role, created_at, updated_at FROM user WHERE id = ?', [id]);
        if (!results.length) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const fetchArtistWithoutArtistTableLink = async (req,res)=>{
  const query=  `
        SELECT 
            u.id AS user_id, 
            CONCAT(u.first_name, ' ', u.last_name) AS full_name
        FROM 
            user u
        LEFT JOIN 
            artist a 
        ON 
            u.id = a.user_id
        WHERE 
            u.role = 'artist'
        AND 
            a.user_id IS NULL;
    `;
    try {

        const user = await queryDatabase(query)
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const logout = (req, res) => {
    res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logout successful' });
};
