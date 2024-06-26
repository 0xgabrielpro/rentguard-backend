const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const bcrypt = require('bcryptjs');

const createUser = (user, callback) => {
  const { username, email, phone, password, role } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(`INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`,
    [username, email, phone, hashedPassword, role], callback);
};

const agentRequest = (agent, callback) => {
  const { user_id, email, agent_name, experience, contact_number } = agent;
  const query = `INSERT INTO agrequests (user_id, email, agent_name, contact_number, experience) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [user_id, email, agent_name, contact_number, experience], (err) => {
    if (err) {
      console.error('Error inserting agent request:', err);
      callback(err);
    } else {
      console.log('Agent request inserted successfully');
      callback(null);
    }
  });
};


const updateUser = (req, callback) => {
  const { id, username, email, phone, password, role } = req;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(`UPDATE users SET username = ?, email = ?, phone = ?, password = ?, role = ? WHERE id = ?`,
    [username, email, phone, hashedPassword, role, id], callback);
};

const updateUserProfile = (userData, callback) => {
  const { id, username, email, phone } = userData;
  
  if (userData.password) {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    db.run(
      `UPDATE users SET username = ?, email = ?, phone = ?, password = ? WHERE id = ?`,
      [username, email, phone, hashedPassword, id],
      callback
    );
  } else {
    db.run(
      `UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?`,
      [username, email, phone, id],
      callback
    );
  }
};

const makeOwner = (user, callback) => {
  const { id, role } = user;
  db.run(`UPDATE users SET role = ? WHERE id = ?`,
    [role, id], callback);
};

const getUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};

const getUserById = (id, callback) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, row);
  });
};


const deleteUserById = (id, callback) => {
  db.run(`DELETE FROM users WHERE id = ?`, [id], callback);
};

const getAllUsers = (callback) => {
  db.all(`SELECT * FROM users`, [], callback);
};


module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUser,
  updateUserProfile,
  agentRequest,
  makeOwner
};
