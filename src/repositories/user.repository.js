const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.config')

const getProfile = async (userEmail) => {
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

const signup = async (userData) => {
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
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

const deleteProfile = async (userEmail) => {
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

const updateProfile = async (userEmail, userData) => {
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
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

const signin = async (userData) => {
    try {
        let responseBody = null
        const user = await prisma.user.findUnique({
            where: {
                email: userData?.email
            }
        })
        if (!user) {
            responseBody = {
                status: 403,
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
                    status: 403,
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
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

const getUserRole = async (userEmail) => {
    try {
        const response = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        return response?.role
    }
    catch (error) {
        throw error.toString()
    }
    finally {
        await prisma.$disconnect()
    }
}

module.exports = { getProfile, signup, deleteProfile, updateProfile, signin, getUserRole }