const express = require('express');
const supertest = require('supertest');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { protect } = require('../../middleware/authMiddleware');
const User = require('../../models/user');

describe('Auth Middleware', () => {
  let app;
  let request;
  let userStub;
  let jwtStub;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(protect);
    app.get('/', (req, res) => res.status(200).send('Hello, world!'));

    request = supertest(app);

    // Set up stubs
    userStub = sinon.stub(User, 'findById');
    jwtStub = sinon.stub(jwt, 'verify');
  });

  afterAll(() => {
    // Restore original function after tests
    userStub.restore();
    jwtStub.restore();
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request.get('/api/users/');
    expect(res.status).toBe(401);
  });

  it('should return 401 if token is invalid', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    jwtStub.throws();
    const res = await request
      .get('/api/users/')
      .set('Authorization', 'Bearer invalid_token');
    expect(res.status).toBe(401);
    expect(consoleSpy).toHaveBeenCalled(); // add this
    consoleSpy.mockRestore(); // and this
  });

  it('should return 200 if token is valid', async () => {
    const mockUser = { _id: 'valid_user_id', email: 'test@example.com' };

    jwtStub.returns({ id: mockUser._id, iat: Date.now(), exp: Date.now() });
    userStub.returns(Promise.resolve(mockUser));

    const res = await request
      .get('/api/users/')
      .set('Authorization', 'Bearer valid_token');
    expect(res.status).toBe(200);
  });
});
