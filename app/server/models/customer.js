'use strict';

module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        customer_code: {
            type: DataTypes.STRING,
            unique: true
        },
        full_name: {
            type: DataTypes.STRING(50)
        },
        demand: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING(500)
        },
        phone_number: {
            type: DataTypes.STRING(20)
        },
        email: {
            type: DataTypes.STRING(30)
        },
        fk_customer_created_by: {
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        fk_customer_updated_by: {
            type: DataTypes.BIGINT(20).UNSIGNED
        }
    }, {
            tableName: 're_customer',
            classMethods: {
                associate: function (models) {
                    Customer.belongsToMany(models.Account, { through: 'CustomerAssignment', as: 'assignees' });
                    Customer.belongsTo(models.Account, { as: 'created_by', foreignKey: 'fk_customer_created_by' });
                    Customer.belongsTo(models.Account, { as: 'updated_by', foreignKey: 'fk_customer_updated_by' });
                    Customer.belongsTo(models.CustomerStatus, { as: 'customer_status', foreignKey: 'customer_status_id' });
                }
            }
        });
    return Customer;
};