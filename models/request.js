const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const bcrypt = require('bcryptjs');

const deleteRequestById = (id, callback) => {
  db.run(`DELETE FROM requests WHERE id = ?`, [id], callback);
};

const getAllRequests = (callback) => {
  db.all(`SELECT * FROM requests`, [], callback);
};

const getRequestById = (id, callback) => {
  db.get(`SELECT * FROM requests WHERE id = ?`, [id], callback);
};

module.exports = {
  getAllRequests,
  deleteRequestById,
  getRequestById
};
