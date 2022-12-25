const UserService = require('../services/user.service')

const getAllUsers = async (req, res, next) => {
    try {
        const response = await UserService.getAllUsers()
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).send(responseBody)
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

const signupUser = async (req, res, next) => {
    try {
        const response = await UserService.signupUser(req?.body)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).send(responseBody)
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

const deleteProfile = async (req, res, next) => {
    try {
        const response = await UserService.deleteProfile(req?.params?.email)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).send(responseBody)
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

const updateProfile = async (req, res, next) => {
    try {
        const response = await UserService.updateProfile(req?.params?.email, req?.body)
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

const signinUser = async (req, res, next) => {
    try {
        const response = await UserService.signinUser(req?.body)
        const responseBody = {
            status: response?.status,
            message: response?.message,
            body: response?.body
        }
        res.status(response?.status).send(responseBody)
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

module.exports = { getAllUsers, signupUser, deleteProfile, updateProfile, signinUser }