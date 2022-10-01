'use strict';

module.exports = function (sequelize, DataTypes) {

    var GroupAccount = sequelize.define('GroupAccount', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        group_name: {
            type: DataTypes.STRING(20),
            unique: true
        },
        is_sys_admin: {
            type: DataTypes.BOOLEAN
        }
    }, {
            tableName: 're_group_account',
            classMethods: {
                associate: function (models) {
                    GroupAccount.hasMany(models.GroupPermission, {
                        foreignKey: 'group_id',
                        as: 'permissions'
                    });
                }
            }
        });

    return GroupAccount;
};