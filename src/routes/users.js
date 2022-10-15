var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', UserController.getAllUsers);

module.exports = router;
