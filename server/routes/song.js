import express from 'express';
import connection from '../db.js';

const router = express.Router();

router.use(express.json());

router.post('/:artistId', (req, res) => {
    const { title, release_date, genre, duration, album } = req.body;
    const { artistId } = req.params;

    const checkArtistQuery = 'SELECT * FROM artist WHERE id = ?';
    connection.query(checkArtistQuery, [artistId], (err, artistResults) => {
        if (err) {
            return res.status(500).json({ error: 'Database error occurred' });
        }
        if (artistResults.length === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const insertSongQuery = `INSERT INTO song (title, release_date, genre, duration, album, artist_id) 
                                 VALUES (?, ?, ?, ?, ?, ?)`;
        connection.query(insertSongQuery, [title, release_date, genre, duration, album, artistId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create song' });
            }
            res.status(201).json({ message: 'Song created successfully', songId: result.insertId });
        });
    });
});

router.get('/:artistId', (req, res) => {
    const { artistId } = req.params;

    const query = `SELECT song.*, artist.name as artist_name 
                   FROM song 
                   JOIN artist ON song.artist_id = artist.id 
                   WHERE artist_id = ?`;

    connection.query(query, [artistId], (err, songs) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch songs' });
        }
        if (songs.length === 0) {
            return res.status(404).json({ error: 'No songs found for this artist' });
        }
        res.status(200).json(songs);
    });
});

router.put('/:id', (req, res) => {
    const { title, release_date, genre, duration, album } = req.body;

    const updateQuery = `UPDATE song 
                         SET title = ?, release_date = ?, genre = ?, duration = ?, album = ? 
                         WHERE id = ?`;

    connection.query(updateQuery, [title, release_date, genre, duration, album, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update song' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json({ message: 'Song updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
    const deleteQuery = `DELETE FROM song WHERE id = ?`;

    connection.query(deleteQuery, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete song' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    });
});

export default router;
