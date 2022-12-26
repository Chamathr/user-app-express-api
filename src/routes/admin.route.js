var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/admin.controller')
const { celebrate } = require('celebrate');
const admin = require('../validations/admin.validation')
const authMiddleware = require('../midlewares/auth.middleware')

/*admin routes*/
router.get('/get-users', [authMiddleware.authenticateAdmin], AdminController.getAllUsers);

router.get('/get-user-byid/:email', [celebrate(admin.adminValidation.getUserById)], [authMiddleware.authenticateAdmin], AdminController.getUserById);

router.put('/change-user-status/:email', [celebrate(admin.adminValidation.changeUserStatus)], [authMiddleware.authenticateAdmin], AdminController.changeUserStatus)

router.put('/delete-user/:email', [celebrate(admin.adminValidation.deleteUser)], [authMiddleware.authenticateAdmin], AdminController.deleteUser)

router.delete('/delete-user-permanent/:email', [celebrate(admin.adminValidation.deleteUserPermanent)], [authMiddleware.authenticateAdmin], AdminController.deleteUserPermanent)

router.put('/reset-user-password/:email', [celebrate(admin.adminValidation.resetUserPassword)], AdminController.resetUserPassword)

module.exports = router;
