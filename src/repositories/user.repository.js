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

const signupUser = async (userData) => {
    try {
        userData.password = bcrypt.hashSync(userData?.password, 8)
        let responseBody = null
        const userExists = await prisma.user.findUnique({
            where: {
                email: userData?.email
            }
        })
        if (userExists) {
            responseBody = {
                status: 409,
                message: 'user already exits',
                body: 'user already exits'
            }
        } else {
            const response = await prisma.user.create(
                {
                    data: userData
                }
            )
            responseBody = {
                status: 201,
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

const updateUser = async (userEmail, userData) => {
    try {
        userData.password = bcrypt.hashSync(userData?.password, 8)
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
                        name: userData?.name,
                        password: bcrypt.hashSync(userData?.password, 8),
                        age: userData?.age
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

const signinUser = async (userData) => {
    try {
        let responseBody = null
        const user = await prisma.user.findUnique({
            where: {
                email: userData?.email
            }
        })
        if (!user) {
            responseBody = {
                status: 404,
                message: 'invalid user',
                body: 'invalid user'
            }
        } else {
            const passwordIsValid = bcrypt.compareSync(
                userData?.password,
                user?.password
            );
            if (!passwordIsValid) {
                responseBody = {
                    status: 404,
                    message: 'invalid password',
                    body: 'invalid password'
                }
            } else {
                const token = jwt.sign({ email: user?.email, userRole: user?.role }, authConfig.secret, {
                    expiresIn: authConfig.time
                });
                responseBody = {
                    status: 200,
                    message: 'succesfully logged in',
                    body: token
                }
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

module.exports = { getAllUsers, signupUser, deleteUser, updateUser, signinUser }