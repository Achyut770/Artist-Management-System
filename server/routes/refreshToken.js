import express from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import connection from '../db.js';

const router = express.Router();

router.post('/', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired refresh token' });
        }

        const { userId } = decoded;

        const query = 'SELECT role FROM user WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userRole = results[0].role;

            const newAccessToken = jwt.sign({ userId: userId, role: userRole }, ACCESS_TOKEN_SECRET, { expiresIn: '20m' });

            res.status(200).json({
                message: 'Tokens refreshed successfully',
                accessToken: newAccessToken,
                role: userRole
            });
        });
    });
});

export default router;
