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

const createUser = async (req) => {
    try{
        const response = await prisma.user.create(
            {
                data: req?.body
            }
        )
        const responseBody = {
            status: 201,
            message: 'success',
            body: response
        }
        return responseBody
    }
    catch(error){
        const errorBody = {
            status: 500,
            message: 'failed',
            body: error
        }
        return errorBody
    }
    finally{
        await prisma.$disconnect()
    }
}

module.exports = { getAllUsers, createUser }