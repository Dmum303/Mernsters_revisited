var tokenChecker = require('../tokenChecker');
var express = require('express');
var router = express.Router();
var {
  createUser,
  getOneUser,
  getAllUsers,
} = require('../controllers/userController');

/* GET users listing. */
router.post('/createUser', createUser);
router.post('/getOneUser', tokenChecker, getOneUser);
router.get('/getAllUsers', getAllUsers);

module.exports = router;
