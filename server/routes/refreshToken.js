import express from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import connection from '../db.js';

const router = express.Router();

// Route to refresh access token
router.post('/', (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired refresh token' });
        }

        const { userId } = decoded; // Extract user ID from decoded token

        // Query to get user role from the database
        const query = 'SELECT role FROM user WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err || !results.length) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userRole = results[0].role; // Get the user's role

            // Create a new access token
            const newAccessToken = jwt.sign({ userId: userId, role: userRole }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

            // Respond with the new access token and user role
            res.status(200).json({
                message: 'Tokens refreshed successfully',
                accessToken: newAccessToken,
                role: userRole
            });
        });
    });
});

export default router;
