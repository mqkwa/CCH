module.exports = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
