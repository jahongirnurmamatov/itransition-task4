import express from 'express';
import { blockUnBlockUserById, getAllUsers, getUserById } from '../controller/user.controller.js';

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:userId',getUserById);
router.post('/block/:userId',blockUnBlockUserById);


export default router; 