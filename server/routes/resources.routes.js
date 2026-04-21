const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resources.controller');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/', resourcesController.getResources);

// Protected routes
router.post('/', authenticateToken, resourcesController.createResource);
router.put('/:id', authenticateToken, resourcesController.updateResource);
router.delete('/:id', authenticateToken, resourcesController.deleteResource);

module.exports = router;
