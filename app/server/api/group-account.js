const models = require('../models');
const ApiError = require('../errors/api-error');
const _ = require('underscore');

const api = {};

api.getGroups = () => {
    const promise = new Promise((resolve, reject) => {
        models.GroupAccount.findAll({
            include: [
                {
                    model: models.GroupPermission,
                    as: 'permissions',
                    attributes: ['action'],
                    include: [
                        { model: models.AppResource, attributes: ['resource_name'], as: 'resource' }
                    ]
                }
            ],
            attributes: { exclude: ['is_sys_admin'] },
            where: {
                'is_sys_admin': { $not: true }
            }
        })
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

function mapItem(item) {
    item = item.toJSON();
    item.permissions = _.groupBy(item.permissions, (permission) => {
        const resource = permission.resource.resource_name;
        return resource;
    });
    for (var key in item.permissions) {
        item.permissions[key] = _.pluck(item.permissions[key], 'action');
    }
    return item;
}

api.getGroup = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.GroupAccount.findById(id, {
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
        })
            .then((group) => {
                const item = mapItem(group);
                resolve(item);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.saveGroup = (data) => {
    const promise = new Promise((resolve, reject) => {
        models.GroupAccount.findOrCreate({
            where: {
                id: data.id
            },
            defaults: data
        }).then((res) => {
            const group = res[0];
            const isCreated = res[1];
            if (!isCreated) {
                return group.update(data);
            }
            return group;
        }).then((group) => {
            resolve(group);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

api.savePermission = (groupId, data) => {
    const promise = new Promise((resolve, reject) => {
        if (!data && !data.length && !groupId) {
            return reject();
        }
        const permission = {
            resource_id: data.resource_id,
            action: data.action,
            group_id: parseInt(groupId, 10)
        };
        models.GroupPermission.create(permission)
            .then((res) => {
                resolve(res);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.removePermission = (groupId, data) => {
    const promise = new Promise((resolve, reject) => {
        if (!data && !data.length && !groupId) {
            return reject();
        }
        const permission = {
            resource_id: data.resource_id,
            action: data.action,
            group_id: groupId
        };
        models.GroupPermission.destroy({
            where: permission
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};

api.deleteGroup = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.GroupAccount.findById(id)
            .then((customer) => {
                if (!customer) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return customer.destroy();
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