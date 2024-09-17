import { ACCESS_TOKEN_SECRET } from "../config.js";
import connection from "../db.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return { error: res.status(403).json({ error: 'No token provided' }) };
    }

    return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return { error: res.status(403).json({ error: 'Failed to authenticate token' }) };
        }
        return { decoded };
    });
};

export const checkUserRole = (requiredRole) => (req, res, next) => {
    const { decoded, error } = verifyToken(req, res);
    if (error) return error;

    const userId = decoded.userId;
    getUserRole(userId, res, (role) => {
        if (role !== requiredRole) {
            return res.status(401).json({ error: `Access denied. Not a ${requiredRole}` });
        }
        next();
    });
};

const getUserRole = (userId, res, callback) => {
    const query = 'SELECT role FROM user WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = results[0];
        callback(user.role);
    });
};