const _ = require('underscore');

const models = require('../models');
const ApiError = require('../errors/api-error');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jsonwebtoken');

const api = {};

api.login = (data) => {
    const promise = new Promise((resolve, reject) => {
        models.Account.findOne({
            where: {
                email: data.email
            },
            attributes: ['id', 'group_account_id', 'password'],
            include: [
                {
                    model: models.GroupAccount,
                    as: 'group_account',
                    attributes: ['group_name', 'is_sys_admin'],
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
            ]
        }).then((acc) => {
            if (!acc) {
                return reject(new ApiError('ER_ACCOUNT_NOT_EXISTS', 'Account not exists'));
            }
            bcrypt.compare(data.password, acc.password).then((res) => {
                if (!res) {
                    reject(new ApiError('ER_AUTH_ERROR', 'Auth error'));
                }
                const user = mapItem(acc);
                const response = { id: user.id, group_account: user.group_account };
                const token = jwt.sign(response);
                response.token = token;
                resolve(response);
            });
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });

    });
    return promise;
};

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

module.exports = api;