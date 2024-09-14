import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from '../db.js';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import { checkAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [first_name, last_name, email, hashedPassword, phone, dob, gender, address, role], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User created successfully', userId: results.insertId });
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
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

        res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    });
});

router.get('/', (_, res) => {
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

router.put('/:id', checkAdmin, async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;

    try {
        let query = 'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?';
        const values = [first_name, last_name, email, phone, dob, gender, address, role, id];

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            query = 'UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?';
            values[3] = hashedPassword;
        }

        connection.query(query, values, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
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
