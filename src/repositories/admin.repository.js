const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.config')

const getAllUsers = async () => {
    try {
        const response = await prisma.user.findMany()
        const responseBody = {
            status: 200,
            message: 'success',
            body: response
        }
        return responseBody
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        return errorBody
    }
    finally {
        await prisma.$disconnect()
    }
}

const updateUser = async (userEmail, userData) => {
    try {
        let responseBody = null
        const userExists = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (!userExists) {
            responseBody = {
                status: 404,
                message: 'user not found',
                body: 'user not found'
            }
        } else {
            const response = await prisma.user.update(
                {
                    where: {
                        email: userEmail
                    },
                    data: {
                        user_status: userData?.userStatus
                    }
                }
            )
            responseBody = {
                status: 200,
                message: 'success',
                body: response
            }
        }
        return responseBody
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        return errorBody
    }
    finally {
        await prisma.$disconnect()
    }
}

const changeUserStatus = async (userEmail, userStatus) => {
    try {
        let responseBody = null
        const userExists = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (!userExists) {
            responseBody = {
                status: 404,
                message: 'user not found',
                body: 'user not found'
            }
        } else {
            const response = await prisma.user.update(
                {
                    where: {
                        email: userEmail
                    },
                    data: {
                        user_status: userStatus
                    }
                }
            )
            responseBody = {
                status: 200,
                message: 'success',
                body: response
            }
        }
        return responseBody
    }
    catch (error) {
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

const deleteUser = async (userEmail) => {
    try {
        let responseBody = null
        const userExists = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (!userExists) {
            responseBody = {
                status: 404,
                message: 'user not found',
                body: 'user not found'
            }
        } else {
            const response = await prisma.user.update(
                {
                    where: {
                        email: userEmail
                    },
                    data: {
                        status: "INACTIVE"
                    }
                }
            )
            responseBody = {
                status: 200,
                message: 'success',
                body: response
            }
        }
        return responseBody
    }
    catch (error) {
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

const deleteUserPermanent = async (userEmail) => {
    try {
        let responseBody = null
        const userExists = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (!userExists) {
            responseBody = {
                status: 404,
                message: 'user not found',
                body: 'user not found'
            }
        } else {
            const response = await prisma.user.delete(
                {
                    where: {
                        email: userEmail
                    }
                }
            )
            responseBody = {
                status: 200,
                message: 'success',
                body: response
            }
        }
        return responseBody
    }
    catch (error) {
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        return errorBody
    }
    finally {
        await prisma.$disconnect()
    }
}

module.exports = { getAllUsers, updateUser, deleteUser, deleteUserPermanent,changeUserStatus }