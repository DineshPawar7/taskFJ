import Post from '../models/postModel.js';
import User from '../models/userModel.js';


export const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    const post = new Post({
      content,
      author: req.user._id,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating post', error: error.message });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching posts', error: error.message });
  }
};


export const updatePostByAdmin = async (req, res) => {
  const { content } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      post.content = content || post.content;
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating post', error: error.message });
  }
};


export const deletePostByAdmin = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      await post.deleteOne();
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting post', error: error.message });
  }
};