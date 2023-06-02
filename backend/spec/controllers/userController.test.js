const request = require('supertest');
const app = require('../../app'); // Your Express app
// const mongoose = require('mongoose');
require('backend/spec/mongodb_helper');

describe('User Controller', () => {
  //   beforeAll(async () => {
  //     await mongoose.connect('mongodb://localhost/test', {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  //   });

  //   afterAll(async () => {
  //     await mongoose.connection.close();
  //   });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/user') // The route to addUser controller
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
    const res = await request(app)
      .post('/user') // The route to addUser controller
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

  //   it('should return user information', async () => {
  //     const user = new User({
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'john@example.com',
  //       password: 'Password123',
  //       profilePic: 'http://example.com/john.jpg',
  //     });

  //     await user.save();

  //     const res = await request(app).get(`/user/${user.id}`); // The route to getMe controller

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.firstName).toEqual('John');
  //     expect(res.body.email).toEqual('john@example.com');
  //   });

  //   it('should return all users', async () => {
  //     const res = await request(app).get('/users'); // The route to getAllUsers controller

  //     expect(res.statusCode).toEqual(200);
  //     expect(Array.isArray(res.body)).toBeTruthy();
  //     expect(res.body.length).toBeGreaterThan(0);
  //   });
});
