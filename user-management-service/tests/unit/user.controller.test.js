const { registerUser, loginUser, getProfile } = require('../../src/controllers/user.controller');
const userService = require('../../src/services/user.service');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');

// Mock the user service methods
jest.mock('../../src/services/user.service');

describe('User Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user and return token', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { name: 'Alice', email: 'alice@example.com', password: 'password123' }
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      userService.findUserByEmail.mockResolvedValue(null);
      userService.createUser.mockResolvedValue({
        _id: '123',
        name: 'Alice',
        email: 'alice@example.com',
        role: 'student'
      });

      await registerUser(req, res, next);
      const data = res._getJSONData();

      expect(res.statusCode).toBe(201);
      expect(data).toHaveProperty('token');
      expect(userService.createUser).toHaveBeenCalledWith({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        role: undefined
      });
    });

    it('should return 400 if user already exists', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { name: 'Bob', email: 'bob@example.com', password: '123456' }
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      userService.findUserByEmail.mockResolvedValue({ email: 'bob@example.com' });

      await registerUser(req, res, next);
      const data = res._getJSONData();

      expect(res.statusCode).toBe(400);
      expect(data.message).toBe('User already exists');
    });
  });

  describe('loginUser', () => {
    it('should login and return token if credentials are correct', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'alice@example.com', password: 'password123' }
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      userService.findUserByEmail.mockResolvedValue({
        _id: '123',
        name: 'Alice',
        email: 'alice@example.com',
        role: 'student',
        matchPassword: jest.fn().mockResolvedValue(true)
      });

      await loginUser(req, res, next);
      const data = res._getJSONData();

      expect(res.statusCode).toBe(200);
      expect(data).toHaveProperty('token');
      expect(data.email).toBe('alice@example.com');
    });

    it('should return 401 if credentials are invalid', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'wrong@example.com', password: 'wrongpassword' }
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      userService.findUserByEmail.mockResolvedValue(null);

      await loginUser(req, res, next);
      const data = res._getJSONData();

      expect(res.statusCode).toBe(401);
      expect(data.message).toBe('Invalid email or password');
    });
  });

  describe('getProfile', () => {
    it('should return user profile if found', async () => {
      const req = httpMocks.createRequest({ user: { id: '123' } });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      userService.findUserById.mockResolvedValue({
        _id: '123',
        name: 'Alice',
        email: 'alice@example.com'
      });

      await getProfile(req, res, next);
      const data = res._getJSONData();

      expect(res.statusCode).toBe(200);
      expect(data.email).toBe('alice@example.com');
    });

    it('should return 404 if user not found', async () => {
      const req = httpMocks.createRequest({ user: { id: '999' } });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      userService.findUserById.mockResolvedValue(null);

      await getProfile(req, res, next);
      const data = res._getJSONData();

      expect(res.statusCode).toBe(404);
      expect(data.message).toBe('User not found');
    });
  });
});
