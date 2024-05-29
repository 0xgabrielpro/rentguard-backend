const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/:id', userController.findUser);
router.post('/reset-password', userController.resetPassword);
router.post('/forgot-password', userController.forgotPassword);
router.post('/update-profile', userController.forgotPassword);



module.exports = router;
