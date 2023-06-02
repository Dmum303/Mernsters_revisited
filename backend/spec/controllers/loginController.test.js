const request = require('supertest');
const app = require('../../app'); // Your Express app
const User = require('../../models/user');
require('backend/spec/mongodb_helper');

describe('POST /login', () => {
  test('Should respond with a 400 status code if request is invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@mail.com' }); // password is missing

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Please fill out all fields');
  });
});

describe('POST /login', () => {
  test('Should respond with a 401 status code if password is incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@mail.com', password: 'incorrectPassword' });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });
});

describe('POST /login', () => {
  test('Should respond with a 200 status code and token if login is successful', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@mail.com', password: 'correctPassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('email', 'test@mail.com');
  });
});
