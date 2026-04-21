const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticateToken } = require('../middleware/auth');

// Get user profile
router.get('/:id', usersController.getUserProfile);

// Protected routes
router.put('/profile/update', authenticateToken, usersController.updateProfile);
router.post('/:userId/follow', authenticateToken, usersController.followUser);
router.post('/:userId/unfollow', authenticateToken, usersController.unfollowUser);
router.get('/trending/users', usersController.getTrendingUsers);

module.exports = router;
