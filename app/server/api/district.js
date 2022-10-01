const models = require('../models');
const ApiError = require('../errors/api-error');

const DEFAULT_SORT_FIELD = 'district_name';

const api = {};

api.getDistricts = (cityId) => {
    const condition = cityId ? { city_id: cityId } : {};
    const promise = new Promise((resolve, reject) => {
        models.District.findAll(
            {
                where: condition,
                order: DEFAULT_SORT_FIELD
            }
        ).then((res) => {
            resolve(res);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

api.getDistrict = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.District.findById(id)
            .then((district) => {
                resolve(district);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.saveDistrict = (data) => {
    const promise = new Promise((resolve, reject) => {
        models.District.findOrCreate({
            where: {
                id: data.id
            },
            defaults: data
        }).then((res) => {
            const district = res[0];
            const isCreated = res[1];
            if (!isCreated) {
                return district.update(data);
            }
            return district;
        }).then((district) => {
            resolve(district);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

api.deleteDistrict = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.District.findById(id)
            .then((district) => {
                if (!district) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return district.destroy();
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