const { Joi, Segments } = require('celebrate');

const adminValidation = {

    getUserById: {
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        }
    },

    changeUserStatus: {
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        },
        [Segments.BODY]: Joi.object().keys({
            userStatus: Joi.string().required()
        })
    },

    deleteUser: {
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        }
    },

    deleteUserPermanent: {
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        }
    },

    resetUserPassword: {
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        }
    },
}

module.exports = { adminValidation }