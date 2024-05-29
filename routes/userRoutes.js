const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/reset-password', userController.resetPassword);
router.post('/forgot-password', userController.forgotPassword);


module.exports = router;
