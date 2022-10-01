'use strict';

module.exports = function (sequelize, DataTypes) {
    var City = sequelize.define('City', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        city_name: {
            type: DataTypes.STRING(20)
        }
    }, {
            tableName: 're_city'
        });
    return City;
};