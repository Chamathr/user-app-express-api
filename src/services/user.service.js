const UserRepository = require('../repositories/user.repository')

const getProfile = async (userEmail) => {
    try{
        const response = await UserRepository.getProfile(userEmail)
        return response
    }
    catch(error){
        throw error.toString()
    }
}

const signup = async (userData) => {
    try{
        const response = await UserRepository.signup(userData)
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

const signin = async (userData) => {
    try{
        const response = await UserRepository.signin(userData)
        return response
    }
    catch(error){
        throw error.toString()
    }
}

module.exports = { getProfile, signup, deleteProfile, updateProfile, signin }