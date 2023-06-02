require('backend/spec/mongodb_helper');
// require('simple-mongodb-helper');
const User = require('../../models/user');

describe('User Model', () => {
  let testUser;

  beforeAll(async () => {
    // Ensure the indexes are built before running tests
    await User.init();
  });

  beforeEach(async () => {
    // Clear the User collection
    await User.deleteMany({});
    // Create a new user object before each test
    testUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'Password123!', // A strong password that meets the complexity requirements
    });
  });

  it('should be valid with all required fields completed correctly', () => {
    // Ensure that the user is valid
    expect(testUser.validateSync()).toBeUndefined();
  });

  it('should require a firstName', () => {
    testUser.firstName = '';

    // Validate the user and check for the firstName validation error
    const validationError = testUser.validateSync();
    expect(validationError.errors.firstName).toBeDefined();
    expect(validationError.errors.firstName.kind).toBe('required');
  });

  it('should require a lastName', () => {
    testUser.lastName = '';

    // Validate the user and check for the lastName validation error
    const validationError = testUser.validateSync();
    expect(validationError.errors.lastName).toBeDefined();
    expect(validationError.errors.lastName.kind).toBe('required');
  });

  it('should require an email', () => {
    testUser.email = '';

    // Validate the user and check for the email validation error
    const validationError = testUser.validateSync();
    expect(validationError.errors.email).toBeDefined();
    expect(validationError.errors.email.kind).toBe('required');
  });

  it('should require a valid email', () => {
    testUser.email = 'invalid-email';

    // Validate the user and check for the email validation error
    const validationError = testUser.validateSync();
    expect(validationError.errors.email).toBeDefined();
    expect(validationError.errors.email.kind).toBe('user defined');
    expect(validationError.errors.email.message).toBe(
      'Please provide a valid email address.'
    );
  });

  it('should require a unique email', async () => {
    // Save the test user to the database
    await testUser.save();

    // Create a new user with the same email
    const duplicateUser = new User({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'johndoe@example.com', // Same email as the test user
      password: 'Password456!',
    });

    // Save the duplicate user and handle any validation error
    try {
      await duplicateUser.save();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe('MongoServerError');
      expect(error.code).toBe(11000); // Duplicate Key Error code
    }
  });

  it('should require a password', () => {
    testUser.password = '';

    // Validate the user and check for the password validation error
    const validationError = testUser.validateSync();
    expect(validationError.errors.password).toBeDefined();
    expect(validationError.errors.password.kind).toBe('required');
  });

  it('should require a password with proper complexity', () => {
    testUser.password = 'password'; // Weak password without special characters

    // Validate the user and check for the password complexity validation error
    const validationError = testUser.validateSync();
    expect(validationError.errors.password).toBeDefined();
    expect(validationError.errors.password.kind).toBe('user defined');
    expect(validationError.errors.password.message).toBe(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );
  });
});
