const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
        const response = await prisma.user.create(
            {
                data: userData
            }
        )
        const responseBody = {
            status: 201,
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
        const response = await prisma.user.update(
            {
                where: {
                    email: userEmail
                },
                data: {
                    name: userData?.name,
                    age: userData?.age
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

module.exports = { getAllUsers, createUser, deleteUser, updateUser }