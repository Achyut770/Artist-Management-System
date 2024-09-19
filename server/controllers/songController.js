import connection from '../db.js';
import { songValidationSchema } from "../Schema/songSchema.js"
import { erroMessage } from '../utils/error.js';

export const createSong = async (req, res) => {
    try {
        await songValidationSchema.validate(req.body);

        const { title, genre, album_name } = req.body;
        const { artistId } = req.params;

        const checkArtistQuery = 'SELECT * FROM artist WHERE id = ?';
        connection.query(checkArtistQuery, [artistId], (err, artistResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database error occurred' });
            }
            if (artistResults.length === 0) {
                return res.status(404).json({ error: 'Artist not found' });
            }

            const insertSongQuery = `INSERT INTO song (title, genre, album_name, artist_id) VALUES (?, ?, ?, ?)`;
            connection.query(insertSongQuery, [title, genre, album_name, artistId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to create song' });
                }
                res.status(201).json({ message: 'Song created successfully', songId: result.insertId });
            });
        });
    } catch (error) {
        res.status(500).json({ error: erroMessage(error) });
    }
};

export const getSongById = (req, res) => {
    const { id } = req.params;

    const query = `SELECT song.*, artist.name as artist_name FROM song JOIN artist ON song.artist_id = artist.id WHERE song.id = ?`;
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch song' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json(results[0]);
    });
};

export const getSongsByArtistId = (req, res) => {
    const { artistId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const query = `SELECT song.*, artist.name as artist_name FROM song JOIN artist ON song.artist_id = artist.id WHERE artist_id = ? LIMIT ? OFFSET ?`;
    connection.query(query, [artistId, parseInt(limit, 10), offset], (err, songs) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch songs' });
        }
        if (songs.length === 0) {
            return res.status(404).json({ error: 'No songs found for this artist' });
        }

        const countQuery = 'SELECT COUNT(*) AS total FROM song WHERE artist_id = ?';
        connection.query(countQuery, [artistId], (err, countResult) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to count songs' });
            }

            const total = countResult[0].total;
            const totalPages = Math.ceil(total / parseInt(limit, 10));

            res.status(200).json({
                total,
                totalPages,
                page: parseInt(page, 10),
                pageSize: songs.length,
                songs,
            });
        });
    });
};

export const updateSong = async (req, res) => {
    try {
        await songValidationSchema.validate(req.body);

        const { title, genre, album_name } = req.body;
        const { id } = req.params;

        const updateQuery = `UPDATE song SET title = ?, genre = ?, album_name = ? WHERE id = ?`;
        connection.query(updateQuery, [title, genre, album_name, id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update song' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Song not found' });
            }
            res.status(200).json({ message: 'Song updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: erroMessage(error) });
    }
};

export const deleteSong = (req, res) => {
    const { id } = req.params;

    const deleteQuery = `DELETE FROM song WHERE id = ?`;
    connection.query(deleteQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete song' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    });
};
