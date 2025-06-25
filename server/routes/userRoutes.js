import express from 'express';
import {
  googleLogin,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin
} from '../controllers/userController.js';



import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/google-login', googleLogin);


router.get('/admin/all', protect, admin, getAllUsers);
router.put('/admin/user/:id', protect, admin, updateUserByAdmin);
router.delete('/admin/user/:id', protect, admin, deleteUserByAdmin);

export default router;