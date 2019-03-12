const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const logDirectory = path.join(__dirname, '../logs/winston');
const transports = [];

const fileTransport = new (winston.transports.DailyRotateFile)({
    filename: `${logDirectory}/` + 'github-search-app-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    handleExceptions: true,
    colorized: true,
    prettyPrint(object) {
        return JSON.stringify(object);
    },
});

transports.push(fileTransport);

if (process.env.NODE_ENV !== 'production') {
    const consoleLog = new winston.transports.Console({
        name: 'debug-console',
        level: 'debug',
        timestamp: true,
        prettyPrint(object) {
            return JSON.stringify(object);
        },
        handleExceptions: false,
        json: false,
        colorize: true,
    });
    transports.push(consoleLog);
}

const logger = new (winston.Logger)({
    transports,
    exitOnError: false,
});

module.exports = logger;
