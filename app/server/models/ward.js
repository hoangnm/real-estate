'use strict';

module.exports = function (sequelize, DataTypes) {
    var Ward = sequelize.define('Ward', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        ward_name: {
            type: DataTypes.STRING(20)
        }
    }, {
            tableName: 're_ward',
            classMethods: {
                associate: function (models) {
                    Ward.belongsTo(models.District);
                }
            }
        });
    return Ward;
};