const { Joi, Segments } = require('celebrate');

const userValidation = {
    createUser: {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            age: Joi.number().integer().required(),
        })
    }
}

module.exports = { userValidation }