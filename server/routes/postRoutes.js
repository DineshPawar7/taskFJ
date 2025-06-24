import express from 'express';
import {
  createPost,
  getAllPosts,
  updatePostByAdmin,
  deletePostByAdmin,
} from '../controllers/postController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.route('/create').post(protect, createPost);

router.route('/all').get(getAllPosts);

router.route('/admin/:id')
  .put(protect, admin, updatePostByAdmin)
  .delete(protect, admin, deletePostByAdmin);

export default router;