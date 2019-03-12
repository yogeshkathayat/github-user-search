const Joi = require('joi');

module.exports = {
    getUsers: {
        headers: {
            'x-access-token': Joi.string().required(),
            lang: Joi.string().required(),
        },
    },
    getProfile: {
        headers: {
            'x-access-token': Joi.string().required(),
            lang: Joi.string().required(),
        },
    },
    updateProfile: {
        headers: {
            'x-access-token': Joi.string().required(),
            lang: Joi.string().required(),
        },
        body: {
            countryId: Joi.number().optional().allow('').allow(null),
            preferredCurrency: Joi.string().optional().allow('').allow(null),
            password: Joi.string().optional().allow('').allow(null),
            businessActivity: Joi.string().optional().allow('').allow(null),
            skypeId: Joi.string().optional().allow('').allow(null),
        },
    },
    sendOtp: {
        headers: {
            'x-access-token': Joi.string().required(),
            lang: Joi.string().required(),
        },
        body: {
            phoneNumber: Joi.string().required(),
            countryCode: Joi.string().required(),
        },
    },
    verifyOtpdata: {
        headers: {
            'x-access-token': Joi.string().required(),
            lang: Joi.string().required(),
        },
        body: {
            phoneNumber: Joi.string().required(),
            countryCode: Joi.string().required(),
            otp: Joi.string().required(),
        },
    },
};
