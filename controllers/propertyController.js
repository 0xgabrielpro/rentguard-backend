const Property = require('../models/property');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const FileType = require('filetype');


const searchProperties = (req, res) => {
  const { location } = req.query;
  Property.getPropertiesByLocation(location, (err, properties) => {
    if (err) return res.status(500).send({ message: 'Property search failed', err });
    res.status(200).send(properties);
  });
};

const viewAllProperties = (req, res) => {
  Property.getAllProperties((err, properties) => {
    if (err) return res.status(500).send({ message: 'Property search failed', err });
    res.status(200).send(properties);
  });
};

const viewAllPropertiesByOwnerId = (req, res) => {
  const { id } = req.params;
  Property.getAllPropertiesByOwnerId(id, (err, properties) => {
    if (err) return res.status(500).send({ message: 'Property search failed', err });
    res.status(200).send(properties);
  });
};


const viewPropertyDetails = (req, res) => {
  const { id } = req.params;
  Property.getPropertyById(id, (err, property) => {
    if (err || !property) return res.status(404).send({ message: 'Property details are unavailable' });
    res.status(200).send(property);
  });
};


const uploadProperty = async (req, res) => {
  try {
    if (!req.file) {
      console.error('No image uploaded');
      return res.status(400).send({ message: 'No image uploaded' });
    }

    const { location, price, description, ownerId } = req.body;
    const image = req.file;
    
    const originalNameWithoutExt = path.parse(image.originalname).name;
    const imageName = `${originalNameWithoutExt}-${uuidv4()}${path.extname(image.originalname)}`;
    const imagePath = path.join(__dirname, '..', 'images', imageName);

    fs.renameSync(image.path, imagePath);
    await Property.createProperty({ location, price, description, image: imageName, ownerId });

    console.info('Property uploaded successfully:', { imageName, location, price, description, ownerId });
    res.status(201).send({ message: 'Property uploaded successfully' });
  } catch (err) {
    console.error('Error uploading property:', err);
    res.status(500).send({ message: 'Property upload failed', error: err });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, price, description, ownerId } = req.body;
    const image = req.file;
   
    if (!id) {
      console.error('Property ID is required');
      return res.status(400).send({ message: 'Property ID is required' });
    }

    let imageName = null; 
    if (image) {
      const originalNameWithoutExt = path.parse(image.originalname).name;
      imageName = `${originalNameWithoutExt}-${uuidv4()}${path.extname(image.originalname)}`;
      const imagePath = path.join(__dirname, '..', 'images', imageName);

      fs.renameSync(image.path, imagePath);
    }

    await Property.updateProperty({ id, location, price, description, image: imageName, ownerId });

    console.info('Property updated successfully:', { id, location, price, description, ownerId, imageName });
    res.status(200).send({ message: 'Property updated successfully' });
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).send({ message: 'Property update failed', error: err });
  }
};



const deleteProperty = (req, res) => {
  const { id } = req.params;
  Property.deleteProperty(id, (err) => {
    if (err) return res.status(500).send({ message: 'Property deletion failed', err });
    res.status(200).send({ message: 'Property deleted successfully' });
  });
};


// const deleteProperty = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const property = await Property.getPropertyById(id);
    
//     if (!property) {
//       return res.status(404).send({ message: 'Property not found' });
//     }

//     const imageUrl = property.image;
//     const imageName = imageUrl.replace('http://abasi.duckdns.org:3000/images/', '');

//     const imagePath = path.join(__dirname, '..', 'images', imageName);

//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//     } else {
//       console.warn(`Image file not found: ${imagePath}`);
//     }

//     await Property.deleteProperty(id);

//     res.status(200).send({ message: 'Property deleted successfully' });
//   } catch (err) {
//     res.status(500).send({ message: 'Property deletion failed', error: err });
//   }
// };

module.exports = {
  viewAllPropertiesByOwnerId,
  searchProperties,
  viewAllProperties,
  viewPropertyDetails,
  uploadProperty,
  deleteProperty,
  updateProperty
};
