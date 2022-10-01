'use strict';

module.exports = function (sequelize, DataTypes) {

    var CustomerStatus = sequelize.define('CustomerStatus', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        status_name: {
            type: DataTypes.STRING(50)
        }
    }, {
            tableName: 're_customer_status'
        });

    return CustomerStatus;
};