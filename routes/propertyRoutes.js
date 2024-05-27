const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authenticateToken = require('../middlewares/auth');

router.get('/', propertyController.viewAllProperties);
router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.viewPropertyDetails);
router.post('/upload', authenticateToken, propertyController.uploadProperty);
// router.delete('/:id', authenticateToken, propertyController.deleteProperty);

module.exports = router;
