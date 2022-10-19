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

const createUser = async (userData) => {
    try{
        const response = await UserRepository.createUser(userData)
        return response
    }
    catch(error){
        return error
    }
}

const deleteUser = async (userEmail) => {
    try{
        const response = await UserRepository.deleteUser(userEmail)
        return response
    }
    catch(error){
        return error
    }
}

const updateUser = async (userEmail, userData) => {
    try{
        const response = await UserRepository.updateUser(userEmail, userData)
        return response
    }
    catch(error){
        return error
    }
}

module.exports = { getAllUsers, createUser, deleteUser, updateUser }