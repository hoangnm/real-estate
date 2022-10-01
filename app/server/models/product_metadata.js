'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductMetadata = sequelize.define('ProductMetadata', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        meta_key: {
            type: DataTypes.STRING
        },
        meta_value: {
            type: DataTypes.TEXT('long')
        }
    }, {
        tableName: 're_product_metadata'
    });

    return ProductMetadata;
};