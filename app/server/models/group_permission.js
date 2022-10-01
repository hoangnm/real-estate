'use strict';

const config = require('config');
const action = config.get('action');

module.exports = function (sequelize, DataTypes) {

    var GroupPermission = sequelize.define('GroupPermission', {
        group_id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true
        },
        resource_id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true
        },
        action: {
            type: DataTypes.ENUM(action.create, action.delete, action.update, action.view),
            primaryKey: true
        }
    }, {
            tableName: 're_group_permission',
            classMethods: {
                associate: function (models) {
                    GroupPermission.belongsTo(models.AppResource, {
                        foreignKey: 'resource_id',
                        as: 'resource',
                        onUpdate: 'cascade',
                        onDelete: 'cascade'
                    });
                }
            }
        });

    return GroupPermission;
};