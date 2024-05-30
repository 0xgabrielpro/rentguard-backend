const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('../models/user');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const register = (req, res) => {
  const { username, email, phone, password } = req.body;
  User.createUser({ username, email, phone, password, role: 'tenant' }, (err) => {
    if (err) return res.status(500).send({ message: 'User registration failed', err });
    res.status(201).send({ message: 'Account creation successfully' });
  });
};

const update = (req, res) => {
  const { id, username, email, phone, password, role } = req.body;
  User.updateUser({ id, username, email, phone, password, role }, (err) => {
    if (err) return res.status(500).send({ message: 'User update failed', err });
    res.status(201).send({ message: 'Account updated successfully' });
  });
};

const agentRequest = (req, res) => {
  const { user_id, agency_name, experience, contact_number } = req.body;
  User.agentRequest({ user_id, agency_name, experience, contact_number }, (err) => {
    if (err) return res.status(500).send({ message: 'request submition failed', err });
    res.status(201).send({ message: 'Request submited successfully' });
  });
};

const findUser = (req, res) => {
  const { id } = req.query; 

  if (!id) {
    return res.status(400).send({ message: 'User ID is required' });
  }

  getUserById(id, (err, user) => {
    if (err) {
      return res.status(500).send({ message: 'User check failed', err });
    }

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Exclude the password field
    const { password, ...userWithoutPassword } = user;

    res.status(200).send({
      message: 'User found successfully',
      user: userWithoutPassword,
    });
  });
};




const updateProfile = (req, res) => {
  const { id, username, email, phone } = req.body;

  if (!id || !username || !email || !phone) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  User.updateUserProfile({ id, username, email, phone }, (err) => {
    if (err) {
      return res.status(500).send({ message: 'User profile update failed', err });
    }
    
    res.status(201).send({ message: 'Profile updated successfully' });
  });
};


const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Invalid email or password' });
  }

  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.error('Error fetching user by email:', err);
      return res.status(500).send({ message: 'Failed to validate user' });
    }

    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).send({ token, role: user.role, id: user.id, email: email });
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logout successful' });
};

const resetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).send({ message: 'Email and new password are required' });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.error('Error fetching user by email:', err);
      return res.status(500).send({ message: 'Server error' });
    }

    if (!user) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    db.run(
      `UPDATE users SET password = ? WHERE email = ?`,
      [hashedPassword, email],
      (updateErr) => {
        if (updateErr) {
          console.error('Error updating password:', updateErr);
          return res.status(500).send({ message: 'Password reset failed' });
        }

        res.status(200).send({ message: 'Password reset successfully' });
      }
    );
  });
};

const forgotPassword = (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).send({ message: 'Email and new password are required' });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.error('Error fetching user by email:', err);
      return res.status(500).send({ message: 'Server error' });
    }

    if (!user) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    db.run(
      `UPDATE users SET password = ? WHERE email = ?`,
      [hashedPassword, email],
      (updateErr) => {
        if (updateErr) {
          console.error('Error updating password:', updateErr);
          return res.status(500).send({ message: 'Password reset failed' });
        }

        res.status(200).send({ message: 'Password reset successfully' });
      }
    );
  });
};

module.exports = {
  register,
  login,
  logout,
  update,
  resetPassword,
  forgotPassword,
  updateProfile,
  agentRequest,
  findUser
};
