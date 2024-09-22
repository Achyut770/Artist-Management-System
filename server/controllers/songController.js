import { songValidationSchema } from "../Schema/songSchema.js";
import { errorMessage } from '../utils/error.js';
import { queryDatabase } from '../utils/utils.js';



export const createSong = async (req, res) => {
    try {
        // Validate the song schema
        await songValidationSchema.validate(req.body);

        const { title, genre, album_name } = req.body;
        const { artistId } = req.params;

        // Check if artist exists
        const checkArtistQuery = 'SELECT * FROM artist WHERE id = ?';
        const artistResults = await queryDatabase(checkArtistQuery, [artistId]);

        if (!artistResults.length) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        // Insert new song
        const insertSongQuery = `
            INSERT INTO song (title, genre, album_name, artist_id)
            VALUES (?, ?, ?, ?)
        `;
        const result = await queryDatabase(insertSongQuery, [title, genre, album_name, artistId]);

        res.status(201).json({ message: 'Song created successfully', songId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const getSongById = async (req, res) => {
    try {
        const { artistId } = req.params;

        const query = `
            SELECT song.*, artist.name as artist_name
            FROM song 
            JOIN artist ON song.artist_id = artist.id
            WHERE song.id = ?
        `;
        const results = await queryDatabase(query, [artistId]);

        if (!results.length) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch song' });
    }
};

export const getSongsByArtistId = async (req, res) => {
    try {
        const { artistId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Fetch songs by artist ID with pagination
        const query = `
            SELECT song.*, artist.name as artist_name
            FROM song 
            JOIN artist ON song.artist_id = artist.id
            WHERE artist_id = ?
            LIMIT ? OFFSET ?
        `;
        const songs = await queryDatabase(query, [artistId, parseInt(limit, 10), offset]);

        if (!songs.length) {
            return res.status(404).json({ error: 'No songs found for this artist' });
        }

        // Get total count of songs for pagination
        const countQuery = 'SELECT COUNT(*) AS total FROM song WHERE artist_id = ?';
        const countResult = await queryDatabase(countQuery, [artistId]);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            total,
            totalPages,
            page: parseInt(page, 10),
            pageSize: songs.length,
            songs,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
};

export const updateSong = async (req, res) => {
    try {
        // Validate the song schema
        await songValidationSchema.validate(req.body);

        const { title, genre, album_name } = req.body;
        const { songId } = req.params;

        // Update song details
        const updateQuery = `
            UPDATE song
            SET title = ?, genre = ?, album_name = ?
            WHERE id = ?
        `;
        const result = await queryDatabase(updateQuery, [title, genre, album_name, songId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.status(200).json({ message: 'Song updated successfully' });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

export const deleteSong = async (req, res) => {
    try {
        const { songId } = req.params;

        // Delete song by ID
        const deleteQuery = 'DELETE FROM song WHERE id = ?';
        const result = await queryDatabase(deleteQuery, [songId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete song' });
    }
};
