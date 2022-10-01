'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductAssignment = sequelize.define('ProductAssignment', {

    }, {
        tableName: 're_product_assignment'
    });

     return ProductAssignment;
};