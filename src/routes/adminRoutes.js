const express = require('express');
const adminController = require('../controllers/adminController');
const verifyRole = require('../middleware/verifyRole');
const sessionOrJwtMiddleware = require('../middleware/sessionOrJwt');

const router = express.Router();

// Apply middleware
router.use(sessionOrJwtMiddleware);
router.use(verifyRole); // Ensure all routes require admin role

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.toggleUserRole);

module.exports = router;
