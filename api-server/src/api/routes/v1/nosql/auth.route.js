const express = require('express');
const validate = require('express-validation');
const passport = require('passport');
const controller = require('../../../controllers/nosql/auth.controller');
const oAuthLogin = require('../../../middlewares/auth').oAuth;
// const authValidator = require('../../../validations/auth.validation');
const {
    login,
    register,
    forgotPassword,
    resetPassword,
} = require('../../../validations/auth.validation');

const router = express.Router();


router.route('/register')
    .post(validate(register), controller.register);

router.route('/login')
    .post(validate(login), controller.login);

router.route('/refresh-token')
    .post(controller.refresh);

router.route('/forgot-password')
    .post(validate(forgotPassword), controller.forgotPassword);

router.route('/change-password')
    .post(validate(resetPassword), controller.changePassword);

module.exports = router;
