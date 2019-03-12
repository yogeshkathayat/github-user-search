const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const {
  errorMessage,
  version,
} = require('../../config/constants');
const customResponse = require('../utils/response');

/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
exports.converter = (err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    return customResponse.setResponse(res, false, err.status, errorMessage.VALIDATION_ERROR, version.v1, err.errors);
  }
};

/**
 * Catch 404 and forward to error handler
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
exports.notFound = (req, res, next) => customResponse.setResponse(res, false, httpStatus.NOT_FOUND, errorMessage.NOT_FOUND, version.v1, {});
