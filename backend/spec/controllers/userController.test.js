const request = require('supertest');
const app = require('../../app'); // Your Express app
const User = require('../../models/user');
require('backend/spec/mongodb_helper');

describe('User Controller', () => {
  beforeAll(async () => {
    // Ensure the indexes are built before running tests
    await User.init();
  });

  beforeEach(async () => {
    // Clear the User collection
    await User.deleteMany({});
  });
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/createUser') // The route to createUser function
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123!',
        profilePic: 'http://example.com/john.jpg',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.firstName).toEqual('John');
    expect(res.body.email).toEqual('john@example.com');
  });

  it('should return an error for an existing user', async () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      profilePic: 'http://example.com/john.jpg',
    });
    await user.save();

    const res = await request(app)
      .post('/api/users/createUser') // The route to createUser controller
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123!',
        profilePic: 'http://example.com/john.jpg',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('User already exists');
  });

  it('should return user information', async () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      profilePic: 'http://example.com/john.jpg',
    });

    await user.save();

    // Login the user to get the token
    const loginResponse = await request(app)
      .post('/api/login/loginUser')
      .send({ email: 'john@example.com', password: 'Password123!' });

    // Save the token from the response
    const token = loginResponse.body.token;

    // Make the request, include the token in the Authorization header
    const res = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`); // <--- Set the token here

    expect(res.statusCode).toEqual(200);
    expect(res.body.firstName).toEqual('John');
    expect(res.body.email).toEqual('john@example.com');
  });

  // it('should return all users', async () => {
  //   const res = await request(app).get('/users'); // The route to getAllUsers controller

  //   expect(res.statusCode).toEqual(200);
  //   expect(Array.isArray(res.body)).toBeTruthy();
  //   expect(res.body.length).toBeGreaterThan(0);
  // });
});
