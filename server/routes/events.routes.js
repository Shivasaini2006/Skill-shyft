const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/', eventsController.getEvents);
router.get('/:id', eventsController.getEventById);

// Protected routes
router.post('/', authenticateToken, eventsController.createEvent);
router.post('/:eventId/join', authenticateToken, eventsController.joinEvent);
router.post('/:eventId/leave', authenticateToken, eventsController.leaveEvent);

module.exports = router;
