// const db = require('./config/sequelize');

// const sha512 = require('js-sha512').sha512;

// const Configuration = db.Configuration;
// const config = require('../src/api/utils/config.json');

// const Country = db.Country;
// const User = db.User;
// const {
//     roleUser,
// } = require('./config/constants');
// const countryConfig = require('../src/api/utils/country.json');

// module.exports = {
//     /**
//    * bootstarp
//    */
//     async seedConfig() {
//         const promise = [];
//         const count = await Configuration.count({});
//         if (count == 0) {
//             for (let i = 0; i < config.length; i++) {
//                 promise.push(Configuration.create(config[i]));
//             }
//             return Promise.all(promise).then((data) => {
//                 console.log('----config seeded----');
//             }).catch((err) => {
//                 console.log('----err------', err);
//             });
//         }
//     },
//     async seedCountry() {
//         const promise = [];
//         const count = await Country.count({});
//         if (count == 0) {
//             for (let i = 0; i < countryConfig.length; i++) {
//                 const data = {
//                     shortName: countryConfig[i].code,
//                     name: countryConfig[i].name,
//                     countryCode: countryConfig[i].dial_code,
//                 };
//                 promise.push(Country.create(data));
//             }
//             return Promise.all(promise).then((data) => {
//                 console.log('----Country seeded----');
//             }).catch((err) => {
//                 console.log('----err------', err);
//             });
//         }
//     },
// };
