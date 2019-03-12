const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const customResponse = require('../utils/response');
const userService = require('../services/nosql/user.service');
const {
    errorMessage,
    version,
} = require('../../config/constants');

const {
    jwtExpirationInterval,
    jwtSecret,
} = require('../../config/vars');


exports.authVerify = (req, res, next) => {
    const token = req.body.accessToken || req.query.accessToken || req.headers['x-access-token'];
    // verifies secret and checks exp
    jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return customResponse.setResponse(res, false, httpStatus.UNAUTHORIZED, errorMessage.TOKEN_EXPIRED, version.v1, err.name);
            }
            if (err.name === 'JsonWebTokenError') {
                return customResponse.setResponse(res, false, httpStatus.UNAUTHORIZED, errorMessage.TOKEN_UNAUTHORIZED, version.v1, err.name);
            }
        } else {
            data = await (userService.findUserByEmail(decoded.sub.email));
            if (data) {
                req.decoded = decoded.sub;
                next();
            } else {
                return customResponse.setResponse(res, false, httpStatus.UNAUTHORIZED, errorMessage.TOKEN_EXPIRED, version.v1, err.name);
            }
        }
    });
};
