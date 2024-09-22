import express from 'express';
import { artistSchema } from '../Schema/artsitScehma.js'; 
import { errorMessage } from '../utils/error.js'; 
import { getUserRole, queryDatabase } from "../utils/utils.js"; 

const router = express.Router();

// Add a new artist
export const registerArtist = async (req, res) => {
    const { name, dob, gender, address, first_release_year, no_of_albums_released, user_id } = req.body;
    try {
        await artistSchema.validate(req.body); // Validate input data
        const role = await getUserRole(user_id, res); // Check user role
        if (role !== 'artist') {
            return res.status(401).json({ error: 'Access denied. You must have an artist role to register an artist.' });
        }

        // SQL query to insert a new artist
        const query = `
            INSERT INTO artist 
            (name, dob, gender, address, first_release_year, no_of_albums_released, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const results = await queryDatabase(query, [name, dob, gender, address, first_release_year, no_of_albums_released, user_id]);

        res.status(201).json({ message: 'Artist created successfully', artistId: results.insertId });
    } catch (error) {
        if (res.headersSent) return; // Prevent response if headers are already sent
        res.status(500).json({ error: errorMessage(error) });
    }
};

// Add an array of artists in bulk
export const bulkRegisterArtists = async (req, res) => {
    const { artists } = req.body;

    if (!artists || !Array.isArray(artists) || !artists.length) {
        return res.status(400).json({ error: 'Invalid or empty artists array' });
    }

    try {
        for (const artist of artists) {
            const role = await getUserRole(artist.user_id, res);
            if (role !== 'artist') {
                return res.status(400).json({ error: `User with id ${artist.user_id} does not have the artist role` });
            }
            await artistSchema.validate(artist); // Validate each artist
        }

        // SQL query for bulk insertion of artists
        const query = `
            INSERT INTO artist 
            (name, dob, gender, address, first_release_year, no_of_albums_released, user_id)
            VALUES ?
        `;
        const artistValues = artists.map(artist => [
            artist.name,
            artist.dob,
            artist.gender,
            artist.address,
            artist.first_release_year,
            artist.no_of_albums_released,
            artist.user_id
        ]);

        const results = await queryDatabase(query, [artistValues]);
        res.status(201).json({ message: 'Artists created successfully', affectedRows: results.affectedRows });
    } catch (error) {
        if (res.headersSent) return;
        res.status(500).json({ error: errorMessage(error) });
    }
};

// Update an existing artist's details
export const updateArtist = async (req, res) => {
    const { name, dob, gender, address, first_release_year, no_of_albums_released, user_id } = req.body;

    try {
        const role = await getUserRole(user_id);
        if (role !== 'artist') {
            return res.status(401).json({ error: 'Access denied. You must have an artist role to update an artist.' });
        }

        await artistSchema.validate(req.body); // Validate input data

        // SQL query to update existing artist details
        const query = `
            UPDATE artist 
            SET name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums_released = ?, user_id = ?
            WHERE id = ?
        `;
        
        const results = await queryDatabase(query, [name, dob, gender, address, first_release_year, no_of_albums_released, user_id, req.params.id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        res.status(200).json({ message: 'Artist updated successfully' });
    } catch (error) {
        res.status(500).json({ error: errorMessage(error) });
    }
};

// Fetch all artists with pagination support
export const fetchArtists = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        // SQL query to select artists with pagination limits applied
        const query = `
            SELECT id, name, dob, gender, address, first_release_year, no_of_albums_released, user_id 
            FROM artist 
            LIMIT ? OFFSET ?
        `;
        
        const results = await queryDatabase(query,[parseInt(limit), offset]);

        // Query to count total number of artists for pagination purposes
        const countQuery = 'SELECT COUNT(*) AS total FROM artist';
        const countResult = await queryDatabase(countQuery);

        const totalPages = Math.ceil(countResult[0].total / limit);

        res.status(200).json({
            total: countResult[0].total,
            totalPages,
            page: parseInt(page),
            pageSize: results.length,
            artists: results,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch artists' });
    }
};

// Fetch a specific artist by their ID
export const fetchArtistById = async (req,res) => {
    try {
         // SQL query to select a specific artist and their user's full name
         const query = `
             SELECT 
                 a.id AS artist_id,
                 a.name,
                 a.dob,
                 a.gender,
                 a.address,
                 a.first_release_year,
                 a.no_of_albums_released,
                 a.user_id,
                 CONCAT(u.first_name,' ',u.last_name) AS user_full_name
             FROM artist a
             JOIN user u ON a.user_id=u.id 
             WHERE a.id=?
         `;
         
         const results=await queryDatabase(query,[req.params.id]);

         if (!results.length) {
             return res.status(404).json({ error: 'Artist not found' }); 
         }

         res.status(200).json(results[0]); 
     } catch (error) {
         res.status(500).json({ error: 'Failed to fetch artist' }); 
     }
};

// Delete an existing artist by their ID
export const deleteArtist = async (req,res) => {
    try {
         // SQL query to delete an existing artist by their ID 
         const query='DELETE FROM artist WHERE id=?';
         const results=await queryDatabase(query,[req.params.id]);

         if (!results.affectedRows) {
             return res.status(404).json({ error: 'Artist not found' }); 
         }

         res.status(200).json({ message: 'Artist deleted successfully' }); 
     } catch (error) {
         res.status(500).json({ error: 'Failed to delete artist' }); 
     }
};

export default router; 