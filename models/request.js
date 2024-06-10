const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const bcrypt = require('bcryptjs');

const deleteRequestById = (id, callback) => {
  db.run(`DELETE FROM agrequests WHERE id = ?`, [id], callback);
};

const getAllRequests = (callback) => {
  db.all(`SELECT * FROM agrequests`, [], callback);
};

const getRequestById = (id, callback) => {
  db.get(`SELECT * FROM agrequests WHERE id = ?`, [id], callback);
};

module.exports = {
  getAllRequests,
  deleteRequestById,
  getRequestById
};
