User Management Service

Project Overview
The User Management Service is a RESTful API for user registration, login, and profile retrieval. It uses Node.js, Express, MongoDB, and JWT authentication.

Features
- Register users with hashed passwords
- User login with JWT token
- Protected profile endpoint
- Role-based users (user, admin)
- Centralized error handling

Tech Stack
- Node.js, Express
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- nodemon (for development)

Installation
1. Clone the repository:
   git clone <your-repo-url>
   cd user-management-service
2. Install dependencies:
   npm install
3. Start MongoDB:
   mongod

Environment Variables
Create a .env file:
PORT=4000
MONGO_URI=mongodb://localhost:27017/userDB
JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=1h

Running the Application
npm run dev
Server runs at http://localhost:4000

API Endpoints
1. Register User
   POST /api/users/register
   Body: { "name": "John", "email": "john@example.com", "password": "password123", "role": "user" }

2. Login User
   POST /api/users/login
   Body: { "email": "john@example.com", "password": "password123" }

3. Get User Profile
   GET /api/users/profile
   Headers: Authorization: Bearer <token>

Error Handling
- 400: Bad request / User exists
- 401: Unauthorized / Invalid credentials / Token failed
- 404: Resource not found

Code Structure
src/
  app.js                 # Express app
  server.js              # Entry point
  config/
    db.config.js         # MongoDB connection
    server.config.js     # Environment variables
  controllers/
    user.controller.js   # Route handlers
  middleware/
    auth.middleware.js   # JWT auth
  models/
    user.model.js        # Mongoose schema
  routes/
    user.routes.js       # Express routes
  services/
    user.service.js      # DB operations

License
MIT
