import jwt from 'jsonwebtoken';
import connection from '../db.js';
import { ACCESS_TOKEN_SECRET } from '../config.js';

export const checkArtistManager = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log("Error", err)
        if (err) return res.status(403).json({ error: 'Failed to authenticate token' });

        const userId = decoded.userId;

        const query = 'SELECT role FROM user WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query error' });
            if (results.length === 0) return res.status(404).json({ error: 'User not found' });
            const user = results[0];
            if (user.role !== 'artist_manager') {
                return res.status(403).json({ error: 'Access denied. Not an artist manager' });
            }

            next();
        });
    });
};
