import jwt from 'jsonwebtoken';
import connection from '../db.js';
import { ACCESS_TOKEN_SECRET } from "../config.js";

export const checkAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        const userId = decoded.userId;

        const query = 'SELECT role FROM user WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0];
            if (user.role !== 'super_admin') {
                return res.status(403).json({ error: 'Access denied. Not an admin' });
            }

            next();
        });
    });
};
