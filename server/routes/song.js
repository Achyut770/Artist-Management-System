import express from 'express';
import { createSong, getSongById, getSongsByArtistId, updateSong, deleteSong } from '../controllers/songController.js';
import { checkArtistManager } from '../middleware/artistMiddleware.js';

const router = express.Router();

//Routes
router.post('/:artistId', checkArtistManager, createSong);
router.get('/single_song/:id', getSongById);
router.get('/:artistId', getSongsByArtistId);
router.put('/:id', checkArtistManager, updateSong);
router.delete('/:id', checkArtistManager, deleteSong);

export default router;
