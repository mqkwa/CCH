/**
 * @file auth.middleware.js
 * @description Middleware to protect routes by verifying JWT tokens.
 */

const jwt = require('jsonwebtoken');
const config = require('../config/server.config');

/**
 * Protect routes
 */
const protect = (req, res, next) => {
  let token;

  // Check for Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = { id: decoded.id }; // Attach user ID to request
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
