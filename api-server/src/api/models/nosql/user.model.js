/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const {
    userRole,
} = require('../../../config/constants');
require('mongoose-double')(mongoose);
const {
    jwtExpirationInterval,
} = require('../../../config/vars');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: userRole,
        default: 'user',
    },
    phoneNo: {
        type: Number,
        notEmpty: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        notEmpty: true,
    },
    activationCode: {
        type: String,
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', UserSchema);
