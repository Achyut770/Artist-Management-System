import express from 'express';
import { checkAdmin } from '../middleware/authMiddleware.js';
import {
    getUser,
    registerUser,
    loginUser,
    fetchUsers,
    updateUser,
    deleteUser,
    fetchUserById
} from '../controllers/userController.js';

const router = express.Router();

// Routes
router.post('/get-user', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', checkAdmin, fetchUsers);
router.get('/:id', fetchUserById);
router.put('/edit/:id', checkAdmin, updateUser);
router.delete('/delete/:id', checkAdmin, deleteUser);

export default router;
