const conf = require('../config/auth.config')
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository')

const authenticateUserToken = async (req, res, next) => {

    try {
        let responseBody = null
        const token = (req?.headers["authorization"])?.replace("Bearer ", "");
        jwt.verify(token, conf.secret, (err, decoded) => {
            if (err) {
                responseBody = {
                    status: 401,
                    message: 'invalid token',
                    body: 'invalid token'
                }
                res.status(401).json(responseBody)
            } else {
                if (decoded?.email === req?.params?.email) {
                    next();
                }
                else {
                    responseBody = {
                        status: 401,
                        message: 'unauthorized token',
                        body: 'unauthorized token'
                    }
                    res.status(401).json(responseBody)
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const authenticateAdmin = async (req, res, next) => {
    try {
        let responseBody = null
        const token = (req?.headers["authorization"])?.replace("Bearer ", "");
        jwt.verify(token, conf.secret, async (err, decoded) => {
            if (err) {
                responseBody = {
                    status: 401,
                    message: 'invalid token',
                    body: 'invalid token'
                }
                res.status(401).json(responseBody)
            } else {
                const userRole = await UserRepository.getUserRole(decoded?.email)
                if (userRole === "ADMIN") {
                    next()
                }
                else {
                    responseBody = {
                        status: 401,
                        message: 'user has no permission',
                        body: 'user has no permission'
                    }
                    res.status(401).json(responseBody)
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = { authenticateUserToken, authenticateAdmin }