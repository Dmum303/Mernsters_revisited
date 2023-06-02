var tokenChecker = require('../tokenChecker');
var express = require('express');
var router = express.Router();
var { loginUser } = require('../controllers/loginController');

/* POST loginUser listing. */
router.post('/loginUser', loginUser);

module.exports = router;
