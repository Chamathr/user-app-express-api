const UserServices = require('../services/user.service')

const getAllUsers = async (req, res, next) => {
    try {
        const response = await UserServices.getAllUsers()
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

const createUser = async (req, res, next) => {
    try {
        const response = await UserServices.createUser(req)
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

module.exports = { getAllUsers, createUser }