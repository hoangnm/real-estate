const models = require('../models');
const ApiError = require('../errors/api-error');

const DEFAULT_SORT_FIELD = 'id';

const api = {};

api.getAppResources = () => {
    const promise = new Promise((resolve, reject) => {
        models.AppResource.findAll(
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