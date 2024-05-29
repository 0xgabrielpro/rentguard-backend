const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('../models/user');

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

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: 'Invalid email or password' });

  User.getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).send({ message: 'Failed to validate user', err });
    if (!user) return res.status(400).send({ message: 'Invalid email or password' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).send({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).send({ token });
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
  forgotPassword
};
