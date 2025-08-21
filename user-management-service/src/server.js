const http = require('http');
const app = require('./app');
const connectDB = require('./config/db.config');
const config = require('./config/server.config');

connectDB();

const server = http.createServer(app);
server.listen(config.port, () => console.log(`Server running on port ${config.port}`));
