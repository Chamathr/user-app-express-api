const AdminService = require('../services/admin.service')

const getAllUsers = async (req, res, next) => {
    try {
        const response = await AdminService.getAllUsers()
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).json(responseBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).json(errorBody)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const response = await AdminService.getUserById(req?.params?.email)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).json(responseBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).json(errorBody)
    }
}

const resetUserPassword = async (req, res, next) => {
    try {
        const response = await AdminService.resetUserPassword(req?.params?.email)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).json(responseBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).json(errorBody)
    }
}

const changeUserStatus = async (req, res, next) => {
    try {
        const response = await AdminService.changeUserStatus(req?.params?.email, req?.body?.userStatus)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).json(responseBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).json(errorBody)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const response = await AdminService.deleteUser(req?.params?.email)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).json(responseBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).json(errorBody)
    }
}

const deleteUserPermanent = async (req, res, next) => {
    try {
        const response = await AdminService.deleteUserPermanent(req?.params?.email)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).json(responseBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        res.status(500).json(errorBody)
    }
}

module.exports = { getAllUsers, getUserById, resetUserPassword, deleteUser, deleteUserPermanent, changeUserStatus }