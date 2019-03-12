const path = require('path');

/**
 *  import .env variables
 */

require('dotenv-safe').load({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    apiLink: `http://${process.env.HOST}:${process.env.PORT}`,
    basePath: '/api/v1',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    mongo: {
        uri: process.env.NODE_ENV === 'test'
            ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
        enabled: process.env.MONGO_ENABLED,
    },
    frontHost: process.env.FRONT_HOST,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',

    ioPort: process.env.IO_PORT,
    sentryDsn: process.env.SENTRY_DSN,
    HOSTEmail: process.env.NODE_MAILER_MAIL_FROM,
    nodeMailer: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        user: process.env.NODE_MAILER_EMAIL,
        password: process.env.NODE_MAILER_PASSWORD,
    },
};
