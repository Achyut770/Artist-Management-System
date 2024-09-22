

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js'; 
import { editValidationSchema, registerValidationSchema } from '../Schema/userSchema.js';
import { errorMessage } from '../utils/error.js'; 
import { queryDatabase } from '../utils/utils.js'; 

// Function to verify the refresh token and return the user ID
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err); // Reject if token verification fails
            } else {
                resolve(decoded.userId); // Resolve with user ID if successful
            }
        });
    });
};

// Get user details using refresh token
export const getUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' }); // Return error if no token is found
    }
    
    try {
        const userId = await verifyToken(refreshToken , res); // Verify the refresh token
        const userResults = await queryDatabase('SELECT role FROM user WHERE id = ?', [userId]); // Fetch user role
        if (!userResults.length) return res.status(404).json({ error: 'User not found' }); // Handle case where user is not found

        const artistResults = await queryDatabase('SELECT id AS artist_id FROM artist WHERE user_id = ?', [userId]); // Fetch associated artist ID
        const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Generate access token

        res.status(200).json({
            accessToken,
            ...userResults[0],
            artist_id: artistResults.length ? artistResults[0].artist_id : null, // Include artist ID in response if exists
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' }); // Handle invalid refresh token error
    }
};

// Register a new user
export const registerUser = async (req, res) => {
    try {
        await registerValidationSchema.validate(req.body, { abortEarly: false }); // Validate request body against schema
        const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;

        const existingUser = await queryDatabase('SELECT * FROM user WHERE email = ?', [email]); // Check for existing user by email
        if (existingUser.length) {
            return res.status(400).json({ message: 'Email already in use' }); // Return error if email is already in use
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it
        const result = await queryDatabase('INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [first_name, last_name, email, hashedPassword, phone, dob, gender, address, role]); // Insert new user into database
        
        res.status(201).json({ message: 'User created successfully', userId: result.insertId }); // Respond with success message and new user ID
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) }); // Handle any errors that occur during registration
    }
};

// Login a user and return tokens
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await queryDatabase('SELECT * FROM user WHERE email = ?', [email]); // Fetch user by email
        if (!results.length) return res.status(404).json({ error: 'User not found' }); // Handle case where user is not found

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with stored hashed password
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' }); // Handle invalid credentials

        // Generate access and refresh tokens
        const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        // Set refresh token in cookies for secure storage
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        const artistResults = await queryDatabase('SELECT id AS artist_id FROM artist WHERE user_id = ?', [user.id]); // Fetch associated artist ID
        res.status(200).json({ message: 'Login successful', accessToken, ...user, artist_id: artistResults.length ? artistResults[0].artist_id : null }); // Respond with success message and tokens
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) }); // Handle any errors that occur during login
    }
};

// Fetch all users with pagination support
export const fetchUsers = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query; // Get pagination parameters from request query
    const offset = (page - 1) * pageSize; // Calculate offset for pagination

    try {
        const totalRecords = await queryDatabase('SELECT COUNT(*) AS total FROM user'); // Get total number of users for pagination
        const totalPages = Math.ceil(totalRecords[0].total / pageSize); // Calculate total pages based on page size
        
        // Fetch users with pagination limits applied
        const users = await queryDatabase('SELECT id, first_name, last_name, email, phone, dob, gender, address, role, created_at, updated_at FROM user LIMIT ? OFFSET ?', [parseInt(pageSize), parseInt(offset)]);
        
        res.status(200).json({
            data: users,
            currentPage: parseInt(page),
            pageSize: parseInt(pageSize),
            totalRecords: totalRecords[0].total,
            totalPages,
        }); // Respond with paginated data of users
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) }); // Handle any errors that occur during fetching users
    }
};

// Update a user's details by ID
export const updateUser = async (req, res) => {
    const { id } = req.params; 

    try {
        await editValidationSchema.validate(req.body, { abortEarly: false }); // Validate request body against schema
        
        const { first_name, last_name, email, phone, dob, gender, address, role } = req.body;

        const result = await queryDatabase('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?', 
            [first_name, last_name, email, phone, dob, gender, address, role , id]); // Update user's information in the database
        
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' }); // Handle case where no rows were affected (i.e., no matching ID)
        
        res.status(200).json({ message: 'User updated successfully' }); // Respond with success message after update
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) }); // Handle any errors that occur during updating the user
    }
};

// Delete a user by ID
export const deleteUser = async (req,res) => {
    const { id } = req.params;  

    try {
         const result=await queryDatabase('DELETE FROM user WHERE id=?', [id]);  // Execute delete query 
         if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });  // Handle case where no rows were affected 
         res.status(200).json({ message: 'User deleted successfully' });  
     } catch (error) {
         res.status(500).json({ error: errorMessage(error) });  // Handle any errors that occur during deletion 
     }
};

// Fetch a specific user by their ID
export const fetchUserById = async (req,res) => {
    const { id }=req.params;  

    try {
         const results=await queryDatabase('SELECT id , first_name , last_name , email , phone , dob , gender , address , role FROM user WHERE id=?', [id]);  // Retrieve specific user's details from the database 
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


// Logout a user by clearing the refresh token cookie.
export const logout = (req,res)=>{
    res.cookie('refreshToken', '', { expires:new Date(0), httpOnly:true , secure : process.env.NODE_ENV === 'production'});  // Clear the refresh token cookie on logout 
    res.status(200).json({ message:'Logout successful' });  
};