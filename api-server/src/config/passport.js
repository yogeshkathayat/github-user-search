

const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token');
const pgdb = require('./sequelize');

const User = pgdb.User;
const {
    googleClientId,
    googleSecret,
} = require('./vars');
// const BearerStrategy = require('passport-http-bearer');

module.exports = () => {
    passport.use(new GoogleTokenStrategy.Strategy({
        clientID: googleClientId,
        clientSecret: googleSecret,
    },
    (accessToken, refreshToken, profile, done) => {
        User.upsertGoogleUser(
            accessToken, refreshToken, profile,
            (err, user) => done(err, user)
);
    }));
};
