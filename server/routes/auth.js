import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../db.js';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import { checkAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

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

router.post('/get-user', async (req, res) => {
    const { refreshToken } = req.body;
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
});


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;

    try {
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
        return res.status(500).json({ message: error.message });
    }
});


router.post('/login', (req, res) => {
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

        res.status(200).json({ message: 'Login successful', accessToken, refreshToken, ...user });
    });
});

router.get('/', (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    console.log("Page", page)

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
});

router.put('/edit/:id', checkAdmin, async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;

    let query = 'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?';
    let values = [first_name, last_name, email, phone, dob, gender, address, role, id];

    connection.query(query, values, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
});


router.get('/:id', (req, res) => {
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
});



router.delete('/delete/:id', checkAdmin, (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM user WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

export default router;
