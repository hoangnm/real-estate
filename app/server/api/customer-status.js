const models = require('../models');
const ApiError = require('../errors/api-error');

const DEFAULT_SORT_FIELD = 'id';

const api = {};

api.getCustomerStatus = () => {
    const promise = new Promise((resolve, reject) => {
        models.CustomerStatus.findAll(
        ).then((res) => {
            resolve(res);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

module.exports = api;