require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db.config');
const config = require('./config/server.config');
const logger = require('./utils/logger');

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(`User Management Service running on port ${config.port}`);
});
