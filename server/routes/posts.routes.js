const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPostById);

// Protected routes
router.post('/', authenticateToken, postsController.createPost);
router.put('/:id', authenticateToken, postsController.updatePost);
router.delete('/:id', authenticateToken, postsController.deletePost);
router.post('/:postId/like', authenticateToken, postsController.likePost);
router.delete('/:postId/like', authenticateToken, postsController.unlikePost);

module.exports = router;
