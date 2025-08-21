/**
 * @file db.config.js
 * @description Handles the connection to MongoDB using Mongoose.
 */

const mongoose = require('mongoose');
const config = require('./server.config');

/**
 * Connect to MongoDB using Mongoose.
 * Exits the process if connection fails.
 * @async
 * @function connectDB
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB with URI from config
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,    // Use new URL parser
      useUnifiedTopology: true, // Use new topology engine
    });

    console.log('MongoDB Connected:', config.mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;
