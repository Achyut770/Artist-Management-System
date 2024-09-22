import express from 'express';
import { checkAdmin } from '../middleware/authMiddleware.js';
import {
    getUser,
    registerUser,
    loginUser,
    fetchUsers,
    updateUser,
    deleteUser,
    fetchUserById,
    logout,
    fetchArtistWithoutArtistTableLink
} from '../controllers/userController.js';
import { checkArtistManager } from '../middleware/artistMiddleware.js';

const router = express.Router();

router.get('/get_artist_without_artist_table' ,checkArtistManager, fetchArtistWithoutArtistTableLink)
router.post('/get-user', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', checkAdmin, fetchUsers);
router.get('/:id', fetchUserById);
router.put('/edit/:id', checkAdmin, updateUser);
router.delete('/delete/:id', checkAdmin, deleteUser);
router.post('/logout', logout);

export default router;
