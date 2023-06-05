const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // verify token (this will depend on the method used to sign the token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user details without password
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
  try {
    // ...
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
    return;
  }
});

module.exports = { protect };
