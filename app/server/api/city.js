const models = require('../models');
const ApiError = require('../errors/api-error');

const DEFAULT_SORT_FIELD = 'city_name';

const api = {};

api.getCities = () => {
    const promise = new Promise((resolve, reject) => {
        models.City.findAll({
            order: DEFAULT_SORT_FIELD
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

api.saveCity = (data) => {
    const promise = new Promise((resolve, reject) => {
        models.City.findOrCreate({
            where: {
                id: data.id
            },
            defaults: data
        }).then((res) => {
            const city = res[0];
            const isCreated = res[1];
            if (!isCreated) {
                return city.update(data);
            }
            return city;
        }).then((city) => {
            resolve(city);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};


api.deleteCity = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.City.findById(id)
            .then((city) => {
                if (!city) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return city.destroy();
            }).then(() => {
                resolve();
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

module.exports = api;