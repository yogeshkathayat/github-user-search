const express = require('express');

const router = express.Router();
const {
    mongo,
} = require('../../../config/vars');

const authRoute = require('./nosql/auth.route');

router.use('/auth', authRoute);


module.exports = router;
