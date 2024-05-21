import express from 'express';
import {
    signup,
    login,
    logout,
    verifyUser,
    authorizeUser
} from '../controllers/userController.js';

// Create router
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyUser, authorizeUser);
router.get('/logout', logout);

export {router as userRouter};