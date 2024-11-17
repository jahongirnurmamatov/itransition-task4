import express from 'express';
import { getAllUsers, getUserById } from '../controller/user.controller.js';

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:userId',getUserById);

export default router; 