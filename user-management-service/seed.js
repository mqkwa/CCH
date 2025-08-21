const mongoose = require('mongoose');
const User = require('./src/models/user.model'); // adjust path if different
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

const users = [
  { name: 'Alice', email: 'alice@example.com', password: 'password123' },
  { name: 'Bob', email: 'bob@example.com', password: 'password123' },
  { name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
  { name: 'Diana', email: 'diana@example.com', password: 'password123' },
  { name: 'Eve', email: 'eve@example.com', password: 'password123' },
];

User.insertMany(users)
  .then(() => {
    console.log('Users seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding users:', err);
  });
