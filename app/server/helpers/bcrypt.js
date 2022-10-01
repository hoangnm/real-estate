const bcrypt = require('bcryptjs');
const config = require('config');

const APP_CONFIG = config.get('appConfig');
const SALT_ROUNDS = APP_CONFIG.saltRounds;

const api = {
    hash: (password) => bcrypt.hash(password, SALT_ROUNDS),
    compare: (password, hash) => bcrypt.compare(password, hash)
};

module.exports = api;