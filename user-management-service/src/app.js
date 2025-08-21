/**
 * @file app.js
 * @description Main Express app configuration.
 */

const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount user routes under /api/users
app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
