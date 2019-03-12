const express = require('express');
const validate = require('express-validation');
const userController = require('../../../controllers/nosql/user.controller');
const {
    authVerify,
} = require('../../../middlewares/auth');

const acl = require('../../../middlewares/acl/acl');

const router = express.Router();


router.route('/list').get(authVerify, userController.getUserList);

module.exports = router;
