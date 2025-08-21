/**
 * @file server.config.js
 * @description Stores server and application configuration variables.
 */

require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  port: process.env.PORT || 4000,         // Server port
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/userDB', // MongoDB URI
  jwtSecret: process.env.JWT_SECRET || 'yourSecretKey',  // JWT secret key
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',      // JWT expiration time
};
