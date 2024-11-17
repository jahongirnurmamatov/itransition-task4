import express from 'express';
import {  getAllUsers, getUserById,blockToggleBulk, blockToggleById, softDeleteById, bulkSoftDeleteUsers } from '../controller/user.controller.js';

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:userId',getUserById);
router.post('/block-many',blockToggleBulk);
router.post('/block/:userId',blockToggleById);
router.post('/delete/:userId',softDeleteById);
router.post('/delete-many',bulkSoftDeleteUsers);


export default router; 