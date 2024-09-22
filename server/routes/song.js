import express from 'express';
import { createSong, deleteSong, getSongById, getSongsByArtistId, updateSong } from '../controllers/songController.js';
import { checkSongOwnership } from '../middleware/songMiddleWare.js';

const router = express.Router();

//Routes
router.post('/:artistId', checkSongOwnership, createSong);
router.get('/single_song/:artistId', getSongById);
router.get('/:artistId', getSongsByArtistId);
router.put('/:artistId/:songId', checkSongOwnership, updateSong);
router.delete('/:artistId/:songId', checkSongOwnership, deleteSong);

export default router;
