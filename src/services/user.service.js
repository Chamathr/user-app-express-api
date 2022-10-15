const UserRepository = require('../repositories/user.repository')

const getAllUsers = async () => {
    try{
        const response = await UserRepository.getAllUsers()
        return response
    }
    catch(error){
        return error
    }
}

const createUser = async (req) => {
    try{
        const response = await UserRepository.createUser(req)
        return response
    }
    catch(error){
        return error
    }
}

module.exports = { getAllUsers, createUser }