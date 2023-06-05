const request = require('supertest');
const express = require('express');
const User = require('../../models/user');
const { protect } = require('../../middleware/authMiddleware'); // your middleware
const jwt = require('jsonwebtoken');
require('backend/spec/mongodb_helper');

const app = express();

// create a route for testing purpose
app.get('/testRoute', protect, (req, res) => {
  res.status(200).json({ success: true });
});

describe('protect middleware', () => {
  beforeAll(async () => {
    // Ensure the indexes are built before running tests
    await User.init();
  });

  beforeEach(async () => {
    // Clear the User collection
    await User.deleteMany({});
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/testRoute');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Not authorized, no token');
  });

  it('should return 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/testRoute')
      .set('Authorization', 'Bearer invalidToken');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Not authorized, token failed');
  });

  it('should return 200 if token is valid', async () => {
    // create a test user
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      profilePic: 'http://example.com/john.jpg',
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const response = await request(app)
      .get('/testRoute')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
