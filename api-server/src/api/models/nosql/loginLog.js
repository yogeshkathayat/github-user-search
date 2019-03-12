const mongoose = require('mongoose');
/**
 * user contacts Object
 */
const loginLog = new mongoose.Schema({
    userAgent: String,
    ip: String,
    osVersion: String,
    os: String,
    device: String,
    deviceToken: String,
    userId: Number,
    isLoggin: Boolean,
});

module.exports = mongoose.model('loginLog', loginLog);
