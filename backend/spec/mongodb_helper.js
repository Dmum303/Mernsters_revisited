const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0/mernsters_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
