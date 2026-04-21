const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/:postId/comments', commentsController.getPostComments);

// Protected routes
router.post('/:postId/comments', authenticateToken, commentsController.createComment);
router.put('/:commentId', authenticateToken, commentsController.updateComment);
router.delete('/:commentId', authenticateToken, commentsController.deleteComment);

module.exports = router;
