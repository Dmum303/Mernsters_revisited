var tokenChecker = require('../tokenChecker');
var express = require('express');
var router = express.Router();
var {
  addUser,
  loginUser,
  getMe,
  getAllUsers,
} = require('../controllers/userController');

/* GET users listing. */
router.post('/', addUser);
// router.post('/login', loginUser);
router.post('/me', tokenChecker, getMe);
router.get('/getAllUsers', getAllUsers);

module.exports = router;
