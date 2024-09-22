import connection from '../db.js';
import { verifyToken } from '../utils/utils.js';

export const checkSongOwnership = (req, res, next) => {
    const { decoded, error } = verifyToken(req, res);
    if (error) return error;
    const userId = decoded.userId;
    const paramArtistId = req.params.artistId;
    const artistQuery = 'SELECT id AS artist_id FROM artist WHERE user_id = ?';
    connection.query(artistQuery, [userId], (err, artistResults) => {
        if( err || !artistResults || !artistResults.length) return   res.status(404).json({ error: 'Artist asociated with the user not found' });
        if (parseInt(paramArtistId) !== artistResults[0].artist_id)  return res.status(403).json({ error: 'Access denied. Not authorized to perform this action' });
       next();
    });
};