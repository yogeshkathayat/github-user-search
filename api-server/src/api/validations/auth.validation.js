const Joi = require('joi');

module.exports = {
    // POST /v1/auth/register
    register: {
        body: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6).max(128),
        })
            .and('email')
            .min(4),
    },

    // POST /v1/auth/login
    login: {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6).max(128),
        }),
    },

    // POST /v1/auth/forgot-password
    forgotPassword: {
        body: {
            email: Joi.string().email().required(),
        },
    },

    // POST /v1/auth/resetPassword
    resetPassword: {
        body: {
            password: Joi.string().required(),
            activationCode: Joi.string().required(),
        },
    },
};
