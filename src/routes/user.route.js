var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller')
const { celebrate } = require('celebrate');
const user = require('../validations/user.validation')
const authMiddleware = require('../midlewares/auth.middleware')

/*user routes*/
router.get('/get-profile/:email', [authMiddleware.authenticateUserToken], UserController.getProfile);

router.post('/signin', [celebrate(user.userValidation.signin)], UserController.signin)

router.post('/signup', [celebrate(user.userValidation.signup)], UserController.signup);

router.put('/delete-profile/:email', [celebrate(user.userValidation.deleteProfile)], [authMiddleware.authenticateUserToken], UserController.deleteProfile)

router.put('/update-profile/:email', [celebrate(user.userValidation.updateProfile)], [authMiddleware.authenticateUserToken], UserController.updateProfile)

module.exports = router;
