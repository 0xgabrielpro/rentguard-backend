const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const bcrypt = require('bcryptjs');

const createUser = (user, callback) => {
  const { username, email, phone, gender, password, role } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(`INSERT INTO users (username, email, phone, gender, password, role) VALUES (?, ?, ?, ?, ?, ?)`,
    [username, email, phone, gender, hashedPassword, role], callback);
};

const getUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};

const getUserById = (id, callback) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [id], callback);
};

const getAllUsers = (callback) => {
  db.all(`SELECT * FROM users`, [], callback);
};

// Other necessary user model functions...

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers
};
