const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

// router.get('/users', authenticateToken, adminController.viewAllUsers);
// router.delete('/users/:id', authenticateToken, adminController.deleteUser);
// router.put('/users/:id/make-owner', authenticateToken, adminController.makeOwner);
// router.put('/users/:id', authenticateToken, userController.update);
// router.get('/requests', authenticateToken, adminController.viewAllRequests);
// router.get('/requests/:id', authenticateToken, adminController.viewRequest);
// router.delete('/requests/:id', authenticateToken, adminController.deleteRequest);
// router.delete('/property/:id', authenticateToken, adminController.deleteProperty);

router.get('/users', adminController.viewAllUsers);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/make-owner', adminController.makeOwner);
router.put('/users/:id', userController.update);
router.get('/requests', adminController.viewAllRequests);
router.get('/requests/:id', adminController.viewRequest);
router.delete('/requests/:id', adminController.deleteRequest);
router.delete('/property/:id', adminController.deleteProperty);

module.exports = router;
