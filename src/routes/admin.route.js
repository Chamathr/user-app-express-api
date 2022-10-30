var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/admin.controller')
const { celebrate } = require('celebrate');
const admin = require('../validations/admin.validation')

router.get('/users', AdminController.getAllUsers);

router.put('/update-user/:email', [celebrate(admin.adminValidation.updateUser)], AdminController.updateUser)

router.put('/delete-user/:email', [celebrate(admin.adminValidation.deleteUser)], AdminController.deleteUser)

module.exports = router;
