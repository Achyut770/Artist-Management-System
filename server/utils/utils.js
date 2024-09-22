import { ACCESS_TOKEN_SECRET } from "../config.js";
import connection from "../db.js";
import jwt from "jsonwebtoken";


//Verify The access Token
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

//Get the role of the user of user_id
export const getUserRole = (userId, res) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT role FROM user WHERE id = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) {
                return reject(res.status(500).json({ error: 'Database query error' }));
            }
            if (!results.length) {
                return reject(res.status(404).json({ error: 'User not found' }));
            }
            const user = results[0];
            resolve(user.role);
        });
    });
};

// Check The role If the user is certain role
export const checkUserRoles = (allowedRoles) => async (req, res, next) => {
    const { decoded, error } = verifyToken(req, res);
    if (error) return error;
    const userId = decoded.userId;
    try {
        const role = await getUserRole(userId, res);
        if (!allowedRoles.includes(role)) {
            return res.status(401).json({ error: `Access denied. You do not have the required role.` });
        }
        next();
    } catch (err) {
        return err; 
    }
};


// Helper function for querying the database with async/await
export const queryDatabase = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};