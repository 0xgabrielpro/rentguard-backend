const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/agent_request', userController.agentRequest);
router.get('/logout', userController.logout);
router.get('/:id', userController.findUser);
router.post('/reset-password', userController.resetPassword);
router.post('/forgot-password', userController.forgotPassword);
router.put('/update-profile/:id', userController.updateProfile);



module.exports = router;
