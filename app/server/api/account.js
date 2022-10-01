const models = require('../models');
const upload = require('../helpers/upload');
const ApiError = require('../errors/api-error');
const config = require('config');
const _ = require('underscore');
const bcrypt = require('../helpers/bcrypt');

const APP_CONFIG = config.get('appConfig');
const DEFAULT_ACCOUNT_PASS = APP_CONFIG.defaultAccountPass;

const DEFAULT_SORT_FIELD = 'full_name';

const api = {};

function getIncludeOption() {
    const includeOption = [
        {
            model: models.GroupAccount,
            as: 'group_account',
            attributes: ['group_name'],
            where: {
                'is_sys_admin': { $not: true }
            },
            include: [
                {
                    model: models.GroupPermission,
                    as: 'permissions',
                    attributes: ['action'],
                    include: [
                        { model: models.AppResource, attributes: ['resource_name'], as: 'resource' }
                    ]
                }
            ]
        }
    ];
    return includeOption;
}

function mapItem(item) {
    item = item.toJSON();
    item.group_account.permissions = _.groupBy(item.group_account.permissions, (permission) => {
        const resource = permission.resource.resource_name;
        return resource;
    });
    for (var key in item.group_account.permissions) {
        item.group_account.permissions[key] = _.pluck(item.group_account.permissions[key], 'action');
    }
    return item;
}

api.getAccounts = () => {
    const promise = new Promise((resolve, reject) => {
        const options = {
            include: getIncludeOption()
        };
        models.Account.findAll(options)
            .then((res) => {
                res = res.map((item) => {
                    item = mapItem(item);
                    return item;
                });
                resolve(res);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.getAccount = (id) => {
    const promise = new Promise((resolve, reject) => {
        const options = {
            include: getIncludeOption()
        };
        models.Account.findById(parseInt(id, 10), options)
            .then((res) => {
                let item = null;
                if (res) {
                    item = mapItem(res);
                }
                resolve(item);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.saveAccount = (data) => {
    const promise = new Promise((resolve, reject) => {
        const password = data.password || DEFAULT_ACCOUNT_PASS;
        bcrypt.hash(password).then((hash) => {
            data.password = hash;
            return models.Account.findOrCreate({
                where: {
                    id: data.id
                },
                defaults: data
            });
        }).then((res) => {
            const account = res[0];
            const isCreated = res[1];
            if (!isCreated) {
                return account.update(data);
            }
            return account;
        }).then((account) => {
            resolve({ id: account.id });
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

api.deleteAccount = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.Account.findById(id)
            .then((account) => {
                if (!account) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return account.destroy();
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