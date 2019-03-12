const nodemailer = require('nodemailer');
const {
    nodeMailer,
    HOSTEmail,
} = require('../../config/vars');

// const emailService = require('./email');

const logger = require('../utils/logger');

const service = '[email]';

exports.sendEmailViaNodemailer = (accountDetails) => {
    const methodName = '[sendEmailViaNodemailer]';
    try {
        const transporter = nodemailer.createTransport({
            service: nodeMailer.service,
            auth: {
                user: nodeMailer.user,
                pass: nodeMailer.password,
            },
        });

        const mailOptions = {
            from: HOSTEmail, // sender address
            to: accountDetails.email, // list of receivers
            subject: accountDetails.subject, // Subject line
            html: accountDetails.html, // plain text body
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                logger.error(service, methodName, err);
            } else {
                logger.info(service, methodName, info);
            }
        });
    } catch (error) {
        logger.error(logger, methodName, error);
    }
};
