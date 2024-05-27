const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/auth');

router.get('/users', authenticateToken, adminController.viewAllUsers);
router.get('/requests', authenticateToken, adminController.viewAllRequests);
router.delete('/property/:id', authenticateToken, adminController.deleteProperty);

module.exports = router;
