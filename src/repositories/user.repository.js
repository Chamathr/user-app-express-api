const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs");

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

const createUser = async (userData) => {
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
        const response = await prisma.user.delete(
            {
                where: {
                    email: userEmail
                }
            }
        )
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

module.exports = { getAllUsers, createUser, deleteUser, updateUser }