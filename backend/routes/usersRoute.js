var tokenChecker = require('../tokenChecker');
const { protect } = require('../middleware/authMiddleware');
var express = require('express');
var router = express.Router();
var {
  createUser,
  getOneUser,
  getAllUsers,
} = require('../controllers/userController');

/* GET users listing. */
router.post('/createUser', createUser);
router.get('/:id', protect, getOneUser);
router.get('/', protect, getAllUsers);

module.exports = router;
