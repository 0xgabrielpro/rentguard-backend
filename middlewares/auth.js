const jwt = require('jsonwebtoken');

const { secret } = require('../config');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(403).send({ message: 'No token provided' });

  jwt.verify(token, secret, (err, user) => {
    if (err) {

      res.clearCookie('token');
      return res.status(401).send({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
