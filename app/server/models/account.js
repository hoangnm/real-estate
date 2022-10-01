'use strict';

module.exports = function (sequelize, DataTypes) {
    var Account = sequelize.define('Account', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        full_name: {
            type: DataTypes.STRING(20)
        },
        email: {
            type: DataTypes.STRING(30),
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(100)
        },
        area_management: {
            type: DataTypes.STRING(20)
        },
        mobile_phone: {
            type: DataTypes.STRING(20)
        },
        fk_account_created_by: {
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        fk_account_updated_by: {
            type: DataTypes.BIGINT(20).UNSIGNED
        }
    }, {
            tableName: 're_account',
            classMethods: {
                associate: function (models) {
                    Account.belongsTo(models.GroupAccount, {
                        as: 'group_account',
                        foreignKey: 'group_account_id'
                    });
                    Account.belongsToMany(models.Product, { through: 'ProductAssignment' });
                    Account.belongsToMany(models.Customer, { through: 'CustomerAssignment' });
                    Account.belongsTo(models.Account, { as: 'created_by', foreignKey: 'fk_account_created_by' });
                    Account.belongsTo(models.Account, { as: 'updated_by', foreignKey: 'fk_account_updated_by' });
                }
            }
        });
    return Account;
};