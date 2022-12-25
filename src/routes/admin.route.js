var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/admin.controller')
const { celebrate } = require('celebrate');
const admin = require('../validations/admin.validation')
const authMiddleware = require('../midlewares/auth.middleware')

/*admin routes*/
router.put('/change-user-status/:email', [celebrate(admin.adminValidation.changeUserStatus)], [authMiddleware.authenticateAdmin], AdminController.changeUserStatus)

router.put('/delete-user/:email', [celebrate(admin.adminValidation.deleteUser)], [authMiddleware.authenticateAdmin], AdminController.deleteUser)

// router.get('/users', AdminController.getAllUsers);

// router.put('/update-user/:email', [celebrate(admin.adminValidation.updateUser)], AdminController.updateUser)

// router.delete('/delete-user/:email', [celebrate(admin.adminValidation.deleteUser)], AdminController.deleteUser)

// router.delete('/delete-user-permanent/:email', [celebrate(admin.adminValidation.deleteUser)], AdminController.deleteUserPermanent)

module.exports = router;
