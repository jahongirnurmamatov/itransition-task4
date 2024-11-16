import express from 'express';
import { checkauth, login, logout, signup } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/check-auth',verifyToken,checkauth)
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

export default router; 