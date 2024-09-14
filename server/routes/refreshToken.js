import express from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';

const router = express.Router();

router.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired refresh token' });
        }

        const newAccessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, ACCESS_TOKEN_SECRET, { expiresIn: '20m' });

        const newRefreshToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            message: 'Tokens refreshed successfully',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    });
});

export default router;
