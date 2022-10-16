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
        const response = await UserServices.createUser(req?.body)
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
        const response = await UserServices.deleteUser(req?.params?.email)
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

module.exports = { getAllUsers, createUser, deleteUser }