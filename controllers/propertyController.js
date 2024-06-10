const Property = require('../models/property');

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

const uploadProperty = (req, res) => {
  const { location, price, description, image, owner_id } = req.body;
  Property.createProperty({ location, price, description, image, owner_id }, (err) => {
    if (err) return res.status(500).send({ message: 'Property upload failed', err });
    res.status(201).send({ message: 'Property uploaded successfully' });
  });
};

const deleteProperty = (req, res) => {
  const { id } = req.params;
  Property.deleteProperty(id, (err) => {
    if (err) return res.status(500).send({ message: 'Property deletion failed', err });
    res.status(200).send({ message: 'Property deleted successfully' });
  });
};

const updateProperty = (req, res) => {
  const { id } = req.params;
  const { location, price, description, image, owner_id } = req.body;
  if (!id) {
    return res.status(400).send({ message: 'Property ID is required' });
  }
  
  Property.updateProperty({ id, location, price, description, image, owner_id }, (err) => {
    if (err) {
      return res.status(500).send({ message: 'Property update failed', err });
    }
    res.status(200).send({ message: 'Property updated successfully' });
  });
};

module.exports = {
  viewAllPropertiesByOwnerId,
  searchProperties,
  viewAllProperties,
  viewPropertyDetails,
  uploadProperty,
  deleteProperty,
  updateProperty
};
