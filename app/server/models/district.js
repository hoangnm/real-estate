'use strict';

module.exports = function (sequelize, DataTypes) {
    var District = sequelize.define('District', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        district_name: {
            type: DataTypes.STRING(20)
        }
    }, {
            tableName: 're_district',
            classMethods: {
                associate: function (models) {
                    District.belongsTo(models.City);
                }
            }
        });
    return District;
};