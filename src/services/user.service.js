const UserRepository = require('../repositories/user.repository')

const getAllUsers = async () => {
    try{
        const response = await UserRepository.getAllUsers()
        return response
    }
    catch(error){
        throw error.toString()
    }
}

const signupUser = async (userData) => {
    try{
        const response = await UserRepository.signupUser(userData)
        return response
    }
    catch(error){
        throw error.toString()
    }
}

const deleteProfile = async (userEmail) => {
    try{
        const response = await UserRepository.deleteProfile(userEmail)
        return response
    }
    catch(error){
        throw error.toString()
    }
}

const updateProfile = async (userEmail, userData) => {
    try{
        const response = await UserRepository.updateProfile(userEmail, userData)
        return response
    }
    catch(error){
        throw error.toString()
    }
}

const signinUser = async (userData) => {
    try{
        const response = await UserRepository.signinUser(userData)
        return response
    }
    catch(error){
        throw error.toString()
    }
}

module.exports = { getAllUsers, signupUser, deleteProfile, updateProfile, signinUser }