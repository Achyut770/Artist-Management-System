import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config.js';

export const checkSongOwnership = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Failed to authenticate token' });

        const tokenUserId = decoded.userId;
        const paramUserId = req.params.id;

        if (tokenUserId !== paramUserId) {
            return res.status(403).json({ error: 'Access denied. Not authorized to perform this action' });
        }

        next();
    });
};
