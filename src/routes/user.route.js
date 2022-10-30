var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller')
const { celebrate } = require('celebrate');
const user = require('../validations/user.validation')
const authMiddleware = require('../midlewares/auth.middleware')

router.get('/', UserController.getAllUsers);

router.post('/signup', [celebrate(user.userValidation.signupUser)], UserController.signupUser);

router.delete('/:email', [celebrate(user.userValidation.deleteUser)], [authMiddleware.authenticateToken], UserController.deleteUser)

router.put('/update-profile/:email', [celebrate(user.userValidation.updateProfile)], [authMiddleware.authenticateToken], UserController.updateProfile)

router.post('/signin', [celebrate(user.userValidation.signinUser)], UserController.signinUser)

module.exports = router;
