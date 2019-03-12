// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const {
    mongo,
    port,
    env,
} = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const logger = require('./api/utils/logger');

// open mongoose connection
if (mongo.enabled === 'true') {
    logger.info('mongo', typeof mongo.enabled);
    mongoose.connect();
}

/**
 * It starts the server on port
 */
function startServer() {
    // listen to requests
    app.listen(port, () => {
        console.log(`server started on port ${port} (${env})`);
        logger.info(`server started on port ${port} (${env})`);
        app.emit('app_started');
    });
}
startServer();

/**
 * Exports express
 * @public
 */
module.exports = app;
