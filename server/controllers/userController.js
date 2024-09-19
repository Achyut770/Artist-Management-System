import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../db.js';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import { registerValidationSchema, editValidationSchema } from '../Schema/userSchema.js';
import { erroMessage } from '../utils/error.js';

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
        const userId = await verifyToken(refreshToken);
        const query = 'SELECT role FROM user WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ ...results[0] });
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};

export const registerUser = async (req, res) => {
    try {
        await registerValidationSchema.validate(req.body, { abortEarly: false });

        const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;

        const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
        connection.query(checkEmailQuery, [email], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email is already in use' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const query = 'INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(query, [first_name, last_name, email, hashedPassword, phone, dob, gender, address, role], (err, results) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: erroMessage(error) });
    }
};

export const loginUser = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM user WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Login successful', accessToken, ...user });
    });
};

export const fetchUsers = (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const countQuery = 'SELECT COUNT(*) AS total FROM user';
    connection.query(countQuery, (err, countResults) => {
        if (err) return res.status(500).json({ error: err.message });

        const totalRecords = countResults[0].total;
        const totalPages = Math.ceil(totalRecords / pageSize);

        const query = `SELECT id, first_name, last_name, email, phone, dob, gender, address, role, created_at, updated_at 
                       FROM user 
                       LIMIT ? OFFSET ?`;

        connection.query(query, [parseInt(pageSize), parseInt(offset)], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(200).json({
                data: results,
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalRecords,
                totalPages
            });
        });
    });
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        await editValidationSchema.validate(req.body, { abortEarly: false });

        const { first_name, last_name, email, phone, dob, gender, address, role } = req.body;

        const query = 'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?';
        const values = [first_name, last_name, email, phone, dob, gender, address, role, id];

        connection.query(query, values, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully' });
        });
    } catch (error) {
        return res.status(500).json({ error: erroMessage(error) });
    }
};

export const deleteUser = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM user WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

export const fetchUserById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT id, first_name, last_name, email, phone, dob, gender, address, role, password, created_at, updated_at FROM user WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = { ...results[0] };
        res.status(200).json(user);
    });
};

export const logout = (_, res) => {
    res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logout successful' });
};
