const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment-timezone');


/**
 * Refresh Token Schema
 * @private
 */
const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userEmail: {
        type: 'String',
        ref: 'User',
        required: true,
    },
    expires: { type: Date },
});

/**
 * @typedef RefreshToken
 */
module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
