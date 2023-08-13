const AdminService = require('../services/admin.service')
const redisMiddleware = require('../midlewares/redis.middleware')

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
            body: error.toString()
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
        const redisResponse = await redisMiddleware.setRedisCache(req?.params?.email, response?.body)
        if(!redisResponse){
            console.error("Something went wrong with redis insert")
        }
        res.status(response?.status).json(responseBody)
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error.toString()
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
            body: error.toString()
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
            body: error.toString()
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
            body: error.toString()
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
            body: error.toString()
        }
        res.status(500).json(errorBody)
    }
}

module.exports = { getAllUsers, getUserById, resetUserPassword, deleteUser, deleteUserPermanent, changeUserStatus }