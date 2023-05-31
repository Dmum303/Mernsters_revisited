const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0/mernsters_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Wait for Mongoose to build the unique index for User model
});

afterAll(async () => {
  await mongoose.connection.close();
});
