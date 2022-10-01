const models = require('../models');
const upload = require('../helpers/upload');
const ApiError = require('../errors/api-error');

const DEFAULT_SORT_FIELD = 'ward_name';
const api = {};

api.getWards = (districtId) => {
    const condition = districtId ? { district_id: districtId } : {};
    const promise = new Promise((resolve, reject) => {
        models.Ward.findAll(
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

api.saveWard = (data) => {
    const promise = new Promise((resolve, reject) => {
        models.Ward.findOrCreate({
            where: {
                id: data.id
            },
            defaults: data
        }).then((res) => {
            const ward = res[0];
            const isCreated = res[1];
            if (!isCreated) {
                return ward.update(data);
            }
            return ward;
        }).then((ward) => {
            resolve(ward);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

api.deleteWard = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.Ward.findById(id)
            .then((ward) => {
                if (!ward) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return ward.destroy();
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