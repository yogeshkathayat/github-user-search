const httpStatus = require('http-status');
const {
    _,
} = require('lodash');
const {
    errorMessage,
    version,
} = require('../../../config/constants');
const customResponse = require('../../utils/response');
const userService = require('../../services/nosql/user.service');
const logger = require('../../utils/logger');


exports.getUserList = async (req, res) => {
    try {
        const listData = await userService.findAll({});
        return customResponse.setResponse(res, true, httpStatus.OK, errorMessage.SUCCESS, version.v1, listData);
    } catch (error) {
        return customResponse.setResponse(res, false, httpStatus.EXPECTATION_FAILED, errorMessage.FAILED, version.v1, error);
    }
};
