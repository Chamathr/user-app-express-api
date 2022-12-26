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
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

const getUserById = async (userEmail) => {
    try {
        const response = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        const responseBody = {
            status: 200,
            message: 'success',
            body: response
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

const resetUserPassword = async (userEmail) => {
    try {
        let responseBody = null
        let newPassword = null
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
            newPassword = (Math.floor(100000 + Math.random() * 900000)).toString()
            const newEncryptedPassword = bcrypt.hashSync(newPassword, 8)
            const response = await prisma.user.update(
                {
                    where: {
                        email: userEmail
                    },
                    data: {
                        password: newEncryptedPassword
                    }
                }
            )
            responseBody = {
                status: 200,
                message: 'success',
                body: response
            }
        }
        return { responseBody: responseBody, newPassword: newPassword }
    }
    catch (error) {
        throw error.toString()
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
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

module.exports = { getAllUsers, getUserById, resetUserPassword, deleteUser, deleteUserPermanent, changeUserStatus }