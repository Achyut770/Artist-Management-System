import express from 'express';
import connection from '../db.js';
import { checkArtistManager } from '../middleware/artistMiddleware.js';

const router = express.Router();

router.use(express.json());

router.post('/register', checkArtistManager, (req, res) => {
    const { name, dob, gender, address, first_release_year, no_of_albums_released } = req.body;

    const query = `INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums_released)
                   VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(query, [name, dob, gender, address, first_release_year, no_of_albums_released], (err, results) => {
        if (err) {
            console.log("Error", err)
            return res.status(500).json({ error: 'Failed to create artist' });
        }
        res.status(201).json({ message: 'Artist created successfully', artistId: results.insertId });
    });
});

router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const query = `SELECT * FROM artist LIMIT ? OFFSET ?`;
    connection.query(query, [parseInt(limit, 10), offset], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch artists' });
        }

        const countQuery = 'SELECT COUNT(*) AS total FROM artist';
        connection.query(countQuery, (err, countResult) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to count artists' });
            }

            const total = countResult[0].total;
            const totalPages = Math.ceil(total / parseInt(limit, 10));

            res.status(200).json({
                total,
                totalPages,
                page: parseInt(page, 10),
                pageSize: results.length,
                artists: results,
            });
        });
    });
});


router.get('/:id', (req, res) => {
    const query = `SELECT * FROM artist WHERE id = ?`;
    console.log("Id", req.params.id)

    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch artist' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.status(200).json(results[0]);
    });
});

router.put('/edit/:id', checkArtistManager, (req, res) => {
    const { name, dob, gender, address, first_release_year, no_of_albums_released } = req.body;

    const query = `UPDATE artist 
                   SET name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums_released = ?
                   WHERE id = ?`;

    connection.query(query, [name, dob, gender, address, first_release_year, no_of_albums_released, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update artist' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.status(200).json({ message: 'Artist updated successfully' });
    });
});

router.delete('/:id', checkArtistManager, (req, res) => {
    const query = `DELETE FROM artist WHERE id = ?`;

    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete artist' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.status(200).json({ message: 'Artist deleted successfully' });
    });
});

export default router;
