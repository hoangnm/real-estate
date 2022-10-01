'use strict';

module.exports = function (sequelize, DataTypes) {

    var CustomerAssignment = sequelize.define('CustomerAssignment', {

    }, {
            tableName: 're_customer_assignment'
        });

    return CustomerAssignment;
};