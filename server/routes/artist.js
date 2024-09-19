import express from 'express';
import { checkArtistManager } from '../middleware/artistMiddleware.js';
import { checkUserRoles } from '../utils/utils.js';
import {
    registerArtist,
    bulkRegisterArtists,
    fetchArtists,
    fetchArtistById,
    updateArtist,
    deleteArtist
} from '../controllers/artistController.js';

const router = express.Router();

router.use(express.json());

// Routes
router.post('/register', checkArtistManager, registerArtist);
router.post('/bulk_register', checkArtistManager, bulkRegisterArtists);
router.get('/', checkUserRoles(["artist_manager", "super_admin"]), fetchArtists);
router.get('/:id', checkArtistManager, fetchArtistById);
router.put('/edit/:id', checkArtistManager, updateArtist);
router.delete('/:id', checkArtistManager, deleteArtist);

export default router;
