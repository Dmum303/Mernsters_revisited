const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../app'); // Your Express app
const User = require('../../models/user');
require('backend/spec/mongodb_helper');

describe('POST /login', () => {
  // This will run before all tests
  beforeAll(async () => {
    // Create a new user
    const user = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@mail.com',
      password: 'CorrectPassword1!',
    });

    // Save the user to the database
    await user.save();
  });

  test('Should respond with a 400 status code if request is invalid', async () => {
    const response = await request(app)
      .post('/api/login/loginUser')
      .send({ email: 'test@mail.com' }); // password is missing

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Please fill out all fields');
  });

  test('Should respond with a 401 status code if password is incorrect', async () => {
    const response = await request(app)
      .post('/api/login/loginUser')
      .send({ email: 'test@mail.com', password: 'incorrectPassword' });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });

  test('Should respond with a 200 status code and token if login is successful', async () => {
    const response = await request(app)
      .post('/api/login/loginUser')
      .send({ email: 'test@mail.com', password: 'CorrectPassword1!' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('email', 'test@mail.com');
  });

  // This will run after all tests
  afterAll(async () => {
    await User.deleteMany({}); // Deletes all users
  });
});
