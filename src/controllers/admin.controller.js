const AdminService = require('../services/admin.service')

const getAllUsers = async (req, res, next) => {
    try {
        const response = await AdminService.getAllUsers()
        res.status(response?.status).send(response)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).send(errorBody)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const response = await AdminService.updateUser(req?.params?.email, req?.body)
        res.status(response?.status).send(response)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).send(errorBody)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const response = await AdminService.deleteUser(req?.params?.email)
        res.status(response?.status).send(response)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).send(errorBody)
    }
}

const deleteUserPermanent = async (req, res, next) => {
    try {
        const response = await AdminService.deleteUserPermanent(req?.params?.email)
        res.status(response?.status).send(response)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).send(errorBody)
    }
}

module.exports = { getAllUsers, updateUser, deleteUser, deleteUserPermanent }