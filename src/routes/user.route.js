var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller')
const { celebrate } = require('celebrate');
const user = require('../validations/user.validation')
const authMiddleware = require('../midlewares/auth.middleware')

/*user routes*/
router.get('/get-users', UserController.getAllUsers);

router.post('/signup-user', [celebrate(user.userValidation.signupUser)], UserController.signupUser);

router.put('/delete-profile/:email', [celebrate(user.userValidation.deleteProfile)], [authMiddleware.authenticateUserToken], UserController.deleteProfile)

router.put('/update-profile/:email', [celebrate(user.userValidation.updateProfile)], [authMiddleware.authenticateUserToken], UserController.updateProfile)

router.post('/signin-user', [celebrate(user.userValidation.signinUser)], UserController.signinUser)

module.exports = router;
