const jwt = require('jsonwebtoken');
const config = require('config');

const APP_CONFIG = config.get('appConfig');
const PRIVATE_KEY = APP_CONFIG.privateKey;
const EXPIRES_IN = APP_CONFIG.expiresIn;

const api = {
    sign: (acccout) => jwt.sign(acccout, PRIVATE_KEY, { expiresIn: EXPIRES_IN }),
    verify: (token, cb) => jwt.verify(token, PRIVATE_KEY, cb)
};

module.exports = api;