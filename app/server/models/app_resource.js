'use strict';

module.exports = function (sequelize, DataTypes) {

    var AppResource = sequelize.define('AppResource', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        resource_name: {
            type: DataTypes.STRING(30),
            unique: true
        }
    }, {
            tableName: 're_app_resource',
            classMethods: {
                associate: function (models) {
                }
            }
        });

    return AppResource;
};