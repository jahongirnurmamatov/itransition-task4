import express from 'express';
import {  getAllUsers, getUserById,blockToggleBulk, blockToggleById, softDeleteById, bulkSoftDeleteUsers } from '../controller/user.controller.js';

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:userId',getUserById);
router.put('/block-many',blockToggleBulk);
router.put('/block/:userId',blockToggleById);
router.put('/delete/:userId',softDeleteById);
router.put('/delete-many',bulkSoftDeleteUsers);


export default router; 