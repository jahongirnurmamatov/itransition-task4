import express from 'express';
import {  getAllUsers, getUserById,blockToggleBulk, blockToggleById, deleteBy, bulkDeleteUsers } from '../controller/user.controller.js';

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:userId',getUserById);
router.put('/block-many',blockToggleBulk);
router.put('/block/:userId',blockToggleById);
router.put('/delete/:userId',deleteBy);
router.put('/delete-many',bulkDeleteUsers);


export default router; 