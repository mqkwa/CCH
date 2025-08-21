const jwt = require('jsonwebtoken');
const config = require('../config/server.config');
const userService = require('../services/user.service');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = await userService.findUserById(decoded.id);
      if (!req.user) throw new Error('User not found');
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

module.exports = { protect };
