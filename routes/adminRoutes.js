const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

router.get('/users', authenticateToken, adminController.viewAllUsers);
router.delete('/users/:id', authenticateToken, adminController.deleteUser);
router.put('/users/:id/make-owner', authenticateToken, adminController.makeOwner);
router.put('/users/:id', authenticateToken, userController.update);
router.get('/requests', authenticateToken, adminController.viewAllRequests);
router.get('/requests/:id', authenticateToken, adminController.viewRequest);
router.delete('/requests/:id', authenticateToken, adminController.deleteRequest);
router.delete('/property/:id', authenticateToken, adminController.deleteProperty);

module.exports = router;
