const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/admin.middleware');
const adminController = require('../controllers/admin.controller');

// Protect all admin routes
router.use(verifyAdmin);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Team Members
router.get('/team', adminController.getTeamMembers);
router.post('/team', adminController.createTeamMember);
router.put('/team/:id', adminController.updateTeamMember);
router.delete('/team/:id', adminController.deleteTeamMember);

// Blogs
router.get('/blogs', adminController.getBlogs);
router.post('/blogs', adminController.createBlog);

// Projects
router.get('/projects', adminController.getProjects);
router.post('/projects', adminController.createProject);

// Updates
router.get('/updates', adminController.getUpdates);
router.post('/updates', adminController.createUpdate);
router.delete('/updates/:id', adminController.deleteUpdate);

// Settings
router.get('/settings', adminController.getSettings);
router.post('/settings', adminController.updateSettings);

module.exports = router;
