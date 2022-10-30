const { Joi, Segments } = require('celebrate');

const adminValidation = {
  
    updateUser: {
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        },
        [Segments.BODY]: Joi.object().keys({
            userStatus: Joi.string().required()
        })
    }
}

module.exports = { adminValidation }