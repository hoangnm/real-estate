const config = require('config');
const ACTION = config.get('action');

const api = {
    isAllowed: (httpMethod = 'GET', user, resource, data) => {
        if (!resource || !data || !user) {
            return false;
        }
        if (user.group_account && user.group_account.is_sys_admin) {
            return true;
        }
        if (data && data.assignees && data.assignees.some((i) => i.id === user.id)) {
            return true;
        }
        const permissions = user.group_account.permissions;
        const permissionForResource = permissions[resource];

        if (!permissionForResource) {
            return false;
        }

        httpMethod = httpMethod.toLowerCase();
        if (httpMethod === 'get') {
            return permissionForResource.indexOf(ACTION.view) > -1;
        } else if (httpMethod === 'post') {
            return permissionForResource.indexOf(ACTION.create) > -1;
        } else if (httpMethod === 'delete') {
            return permissionForResource.indexOf(ACTION.delete) > -1;
        } else if (httpMethod === 'put') {
            return permissionForResource.indexOf(ACTION.update) > -1;
        }
        return false;
    }
};

module.exports = api;