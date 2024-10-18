import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
