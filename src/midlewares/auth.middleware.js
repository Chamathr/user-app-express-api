const conf = require('../config/auth.config')
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {

    try {
        let responseBody = null
        const token = req?.headers["authorization"];
        jwt.verify(token, conf.secret, (err, decoded) => {
            if (err) {
                responseBody = {
                    status: 401,
                    message: 'invalid token',
                    body: 'invalid token'
                }
                res.status(401).send(responseBody)
            } else {
                if(decoded?.email === req?.params?.email){
                    next();
                }
                else{
                    responseBody = {
                        status: 401,
                        message: 'unauthorized token',
                        body: 'unauthorized token'
                    }
                    res.status(401).send(responseBody)
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = { authenticateToken }