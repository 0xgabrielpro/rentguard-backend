const User = require('../models/user');
const Property = require('../models/property');

const viewAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).send({ message: 'Failed to retrieve users', err });
    res.status(200).send(users);
  });
};

const viewAllRequests = (req, res) => {
  // Assuming you have a similar model and functions for requests
  Request.getAllRequests((err, requests) => {
    if (err) return res.status(500).send({ message: 'Failed to retrieve requests', err });
    res.status(200).send(requests);
  });
};

const deleteProperty = (req, res) => {
  const { id } = req.params;
  Property.deleteProperty(id, (err) => {
    if (err) return res.status(500).send({ message: 'Property deletion failed', err });
    res.status(200).send({ message: 'Property deleted successfully' });
  });
};

module.exports = {
  viewAllUsers,
  viewAllRequests,
  deleteProperty
};
