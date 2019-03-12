/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const httpStatus = require('http-status');
const moment = require('moment-timezone');
const randomstring = require('randomstring');
const jwt = require('jwt-simple');
const crypto = require('crypto');
const APIError = require('../../utils/APIError');
const nodeMailer = require('../../utils/email');
const User = require('../../models/nosql/user.model');
const RefreshToken = require('../../models/nosql/refreshToken.model');
const {
    jwtExpirationInterval,
    jwtSecret,
} = require('../../../config/vars');

generateAccessToken = function (user) {
    const currTimeinSecs = new Date().getTime() / 1000;
    const issuedAt = moment.unix(currTimeinSecs);
    const subData = {
        email: user.email,
        id: user._id,
    };
    const playload = {
        exp: moment(issuedAt).add(parseInt(jwtExpirationInterval) * 24, 'days')._i,
        iat: issuedAt._i,
        sub: subData,
    };
    return jwt.encode(playload, jwtSecret);
};

/**
   * Generate a refresh token object and saves it into the database
   *
   * @param {User} user
   * @returns {RefreshToken}
   */
generateRefreshToken = async (user) => {
    try {
        const userId = user._id;
        const userEmail = user.email;
        const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
        const expires = moment().add(30, 'days').toDate();
        const tokenObject = await (new RefreshToken({
            token, userId, userEmail, expires,
        })).save();
        return tokenObject;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user) {
    accessToken = generateAccessToken(user);
    const tokenType = 'Bearer';
    const refreshToken = generateRefreshToken(user).token;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
    try {
        req.body.role = 'user';
        const reqData = req.body;
        reqData.activationCode = randomstring.generate({
            length: 7,
        });
        const userData = await (new User(reqData)).save();
        const token = generateTokenResponse(userData);

        res.status(httpStatus.CREATED);
        return res.json({
            token,
            user: userData,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
    try {
        const userData = await User.findOne(req.body);
        if (userData != null) {
            const token = generateTokenResponse(userData);
            res.status(httpStatus.OK);
            return res.json({
                token,
                user: userData,
            });
        }
        res.status(httpStatus.UNAUTHORIZED);
        return res.json({
            message: 'Invalid email or password',
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
    try {
        const {
            user,
        } = req;
        const accessToken = generateAccessToken(user);
        const token = generateTokenResponse(user, accessToken);
        const userTransformed = user.transform();
        return res.json({
            token,
            user: userTransformed,
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
    try {
        const {
            email,
            refreshToken,
        } = req.body;
        const refreshObject = await RefreshToken.findOneAndRemove({
            userEmail: email,
            token: refreshToken,
        });
        const {
            user,
            accessToken,
        } = await User.findAndGenerateToken({
            email,
            refreshObject,
        });
        const response = generateTokenResponse(user, accessToken);
        return res.json(response);
    } catch (error) {
        return next(error);
    }
};


/**
 * Forgot Password test
 * @private
 */
exports.forgotPassword = (req, res, next) => {
    const methodName = '[ForgotPassword]';

    // eslint-disable-next-line prefer-destructuring
    const email = req.body.email;
    return User.findOne({
        email,
    }).exec().then((user) => {
        if (!user) {
            throw new APIError({
                message: 'User does not exist',
                status: httpStatus.NOT_FOUND,
            });
        }

        return user;
    }).then((user) => {
        const accountDetails = {
            email: user.email,
            subject: 'Activation code for reset password',
            html: `<p>Dear ${user.full_name},</p><p>Please use the <b>${user.activationCode}</b>  code for reset password.</p><p>Thank you!</p>`,
        };
        return nodeMailer.sendEmailViaNodemailer(accountDetails).then(() => {
            res.send({
                msg: 'Password reset instructions '
              + 'has been sent to your email address',
            });
        });
    }).catch(next);
};

/**
 * Change Password
 * @private
 */
exports.changePassword = (req, res, next) => {
    const activationCode = req.body.activationCode;
    const email = req.body.email;
    const password = req.body.password;
    const updateQuery = {
        activationCode: randomstring.generate({
            length: 64,
        }),
        password,
    };
    return User.findOneAndUpdate({
        email,
        activationCode,
    }, updateQuery, {
        new: true,
    }).exec().then((user) => {
        if (!user) {
            throw new APIError({
                message: 'User does not exist',
                status: httpStatus.NOT_FOUND,
            });
        }
        return user;
    }).then((user) => {
        const accountDetails = {
            email: user.email,
            subject: 'Password Reset Successful',
            html: '<p>Password is successfully reset</p><p>Thank you!</p>',
        };
        nodeMailer.sendEmailViaNodemailer(accountDetails).then(() => res.send({
            msg: 'Password has been successfully changed',
        }));
    })
        .catch(next);
};
