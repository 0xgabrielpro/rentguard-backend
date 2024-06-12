const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authenticateToken = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ dest: 'images/' }); 

router.get('/', propertyController.viewAllProperties);
router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.viewPropertyDetails);
router.get('/owner/:id', propertyController.viewAllPropertiesByOwnerId);
router.put('/:id', propertyController.updateProperty);
router.post('/upload', upload.single('image'), propertyController.uploadProperty); 
router.post('/:id', upload.single('image'), propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
