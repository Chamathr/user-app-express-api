var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller')
const { celebrate } = require('celebrate');
const user = require('../validations/user.validation')

router.get('/', UserController.getAllUsers);

router.post('/', [celebrate(user.userValidation.createUser)], UserController.createUser);

router.delete('/:email', [celebrate(user.userValidation.deleteUser)], UserController.deleteUser)

module.exports = router;
