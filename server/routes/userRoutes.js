import express from 'express';
import {
  registerUser,
  googleLogin,
  logoutUser,
  getUserProfile,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  getCurrentSessionUser
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/google-login', googleLogin);
router.post('/logout', logoutUser);

router.get('/profile', protect, getUserProfile);
router.get('/me', getCurrentSessionUser);


router.get('/admin/all', protect, admin, getAllUsers);
router.put('/admin/user/:id', protect, admin, updateUserByAdmin);
router.delete('/admin/user/:id', protect, admin, deleteUserByAdmin);

export default router;