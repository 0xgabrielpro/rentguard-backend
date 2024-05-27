const User = require('../models/user');
const Req = require('../models/request');
const Property = require('../models/property');

const viewAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).send({ message: 'Failed to retrieve users', err });
    res.status(200).send(users);
  });
};

const viewAllRequests = (req, res) => {
  Req.getAllRequests((err, requests) => {
    if (err) return res.status(500).send({ message: 'Failed to retrieve requests', err });
    res.status(200).send(requests);
  });
};

const viewRequest = (req, res) => {
  const { id } = req.params;
  Req.getRequestById(id, (err, requests) => {
    if (err) return res.status(500).send({ message: 'Failed to retrieve request', err });
    res.status(200).send(requests);
  });
};

const makeOwner = (req, res) => {
  const { id } = req.body;
  User.makeOwner({ id, role: 'owner' }, (err) => {
    if (err) return res.status(500).send({ message: 'User update failed', err });
    res.status(201).send({ message: 'Account updated successfully' });
  });
};

const deleteRequest = (req, res) => {
  const { id } = req.params;
  Req.deleteRequestById(id, (err) => {
    if (err) return res.status(500).send({ message: 'Request deletion failed', err });
    res.status(200).send({ message: 'Request deleted successfully' });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteUserById(id, (err) => {
    if (err) return res.status(500).send({ message: 'User deletion failed', err });
    res.status(200).send({ message: 'User deleted successfully' });
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
  viewRequest,
  deleteProperty,
  makeOwner,
  deleteRequest,
  deleteUser
};
