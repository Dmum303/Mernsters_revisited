const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, profilePic } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: 'Please fill out all fields' });
    return; // prevent further execution in this function
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return; // prevent further execution in this function
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  if (profilePic) {
    user.profilePic = profilePic;
  }

  await user.save(); // save the user

  res.status(201).json({
    message: 'User created',
    firstName: user.firstName,
    email: user.email,
  });
});

const getOneUser = asyncHandler(async (req, res) => {
  // Get user ID from req.params
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(user);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

module.exports = { createUser, getOneUser, getAllUsers };
