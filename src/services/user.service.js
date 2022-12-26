const UserRepository = require('../repositories/user.repository')

const signup = async (userData) => {
    try{
        const response = await UserRepository.signup(userData)
        return response
    }
    catch(error){
        throw error
    }
}

const signin = async (userData) => {
    try{
        const response = await UserRepository.signin(userData)
        return response
    }
    catch(error){
        throw error
    }
}

const getProfile = async (userEmail) => {
    try{
        const response = await UserRepository.getProfile(userEmail)
        return response
    }
    catch(error){
        throw error
    }
}

const deleteProfile = async (userEmail) => {
    try{
        const response = await UserRepository.deleteProfile(userEmail)
        return response
    }
    catch(error){
        throw error
    }
}

const updateProfile = async (userEmail, userData) => {
    try{
        const response = await UserRepository.updateProfile(userEmail, userData)
        return response
    }
    catch(error){
        throw error
    }
}

module.exports = { getProfile, signup, deleteProfile, updateProfile, signin }