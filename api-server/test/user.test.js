const expect = require('chai').expect;
const request = require('request');
const randomString = require('randomstring');
const {
  apiLink,
  basePath
} = require('../src/config/vars');
const server = require('../src/index.js');
const fs = require('fs-extra');
const path = require('path');
const mockDataFile = require('./data.json');

describe('Boiler Backend APIs', () => {
  before((done) => {
    server.on('app_started', () => {
      done();
    });
  });

  describe('User Login Tests', () => {
    it('Should Login User', (done) => {
      const dataToSend = {
        url: `${apiLink + basePath}/auth/login`,
        method: 'POST',
        json: {
          email: 'kathayat.yogesh@gmail.com',
          password: 'Qwerty@123',
        },
        headers: {},
      };
      dataToSend.headers.lang = 'en';
      request(dataToSend, (error, response, body) => {
        let responseBody = body;
        try {
          responseBody = JSON.parse(responseBody);
        } catch (error) {}
        expect(responseBody.code).to.equal(200);
        expect(responseBody.status).to.equal(true);
        expect(responseBody.result).to.have.own.property('accessToken');
        expect(responseBody.result).to.have.own.property('user');
        mockDataFile.accessTokens.forEach((token) => {
          if (token.userType == 'user') {
            token.accessToken = responseBody.result.accessToken;
            token.userId = responseBody.result.uuid;
          }
        });

        // for mac fs is not reading the correct path

        const configPath = path.normalize(path.join(path.resolve('./test'), '/data.json'));
        fs.writeJson(configPath, mockDataFile);
        done();
      });
    });

    it('Should not be able to login with wrong credentials', (done) => {
      const dataToSend = {
        url: `${apiLink + basePath}/auth/login`,
        method: 'POST',
        json: {
          email: 'kathayat.yogesh@gmail.com',
          password: '123435445',
        },
        headers: {},
      };
      dataToSend.headers.lang = 'en';
      request(dataToSend, (error, response, body) => {
        let responseBody = body;
        try {
          responseBody = JSON.parse(responseBody);
        } catch (error) {}
        expect(responseBody.code).to.equal(401);
        expect(responseBody.status).to.equal(false);
        done();
      });
    });
  });

  describe('User Register Tests', () => {
    it('Should Register User', (done) => {
      const emailName = randomString.generate({
        length: 8
      });
      const firstName = randomString.generate({
        length: 8
      });
      const lastName = randomString.generate({
        length: 8
      });
      const dataToSend = {
        url: `${apiLink + basePath}/auth/register`,
        method: 'POST',
        json: {
          firstName,
          lastName,
          email: `${emailName.toString()}@gmail.com`,
          password: 'Qwerty@123',
          phoneNo: Math.floor((Math.random() * 10000000000) + 1),
          countryCode: '+91',
        },
        headers: {},
      };
      dataToSend.headers.lang = 'en';
      request(dataToSend, (error, response, body) => {
        let responseBody = body;
        try {
          responseBody = JSON.parse(responseBody);
        } catch (error) {

        }
        expect(responseBody.code).to.equal(201);
        expect(responseBody.status).to.equal(true);
        expect(responseBody).to.have.own.property('result');
        done();
      });
    });

    it('Should not register User with Invalid credentials', (done) => {
      const dataToSend = {
        url: `${apiLink + basePath}/auth/register`,
        method: 'POST',
        json: {
          password: '123456789',
          email: 'abc',
        },
        headers: {},
      };
      dataToSend.headers.lang = 'en';
      request(dataToSend, (error, response, body) => {
        let responseBody = body;
        try {
          responseBody = JSON.parse(responseBody);
        } catch (error) {}
        expect(responseBody.code).to.equal(400);
        expect(responseBody.status).to.equal(false);
        done();
      });
    });
  });
});
