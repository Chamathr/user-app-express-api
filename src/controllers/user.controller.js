const UserService = require('../services/user.service')

const signup = async (req, res, next) => {
    try {
        const response = await UserService.signup(req?.body)
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

const signin = async (req, res, next) => {
    try {
        const response = await UserService.signin(req?.body)
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

const getProfile = async (req, res, next) => {
    try {
        const response = await UserService.getProfile(req?.params?.email)
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

const deleteProfile = async (req, res, next) => {
    try {
        const response = await UserService.deleteProfile(req?.params?.email)
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

const updateProfile = async (req, res, next) => {
    try {
        const response = await UserService.updateProfile(req?.params?.email, req?.body)
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

module.exports = { getProfile, signup, deleteProfile, updateProfile, signin }