
const express = require('express');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hpp = require('hpp');
const cors = require('cors');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const routes = require('../api/routes/v1');


const {
    logs,
    sentryDsn,
} = require('./vars');
const error = require('../api/middlewares/error');


Sentry.init({
    dsn: sentryDsn,
});

const swaggerDocument = require('../api/swagger/swaggerJson');
/**
 * Express instance
 * @public
 */
const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// Sentry Initialisation Should be the first middleware
app.use(Sentry.Handlers.requestHandler());

// Should be enabled on Production
// app.enable("trust proxy");

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500, // limit each IP to 500 requests per windowMs
});

app.use(limiter);

// request logging. dev: console | production: file
app.use(morgan(logs));

app.use(require('express-session')({
    secret: 'bounty_secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// parse body params and attache them to req.body
app.use(bodyParser.json({
    limit: '100mb',
}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000,
}));

// Express middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());


// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({
    credentials: true,
    origin: true,
}));

// enable decryption of request body
// app.use(decrypt);

app.disable('x-powered-by');

// mount api v1 routes
app.use('/api/v1', routes);

// Serving Swagger Docs through here
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);


module.exports = app;
