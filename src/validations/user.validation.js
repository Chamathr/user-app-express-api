const { Joi, Segments } = require('celebrate');

const userValidation = {
    createUser: {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            age: Joi.number().integer().required(),
        })
    },

    deleteUser: {
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        }
    },

    updateUser: {
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        },
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            age: Joi.number().integer(),
        })
    },
}

module.exports = { userValidation }