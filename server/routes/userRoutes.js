import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

router.get('/profile', protect, getUserProfile);

router.get('/admin/all', protect, admin, getAllUsers);
router.put('/admin/user/:id', protect, admin, updateUserByAdmin);
router.delete('/admin/user/:id', protect, admin, deleteUserByAdmin);

export default router;