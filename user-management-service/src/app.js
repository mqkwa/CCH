const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');

app.use(express.json());

app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
