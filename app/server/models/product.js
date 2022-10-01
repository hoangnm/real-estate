'use strict';

module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define('Product', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        address: {
            type: DataTypes.STRING(50)
        },
        product_code: {
            type: DataTypes.STRING,
            unique: true
        },
        product_name: {
            type: DataTypes.STRING(50)
        },
        image_url: {
            type: DataTypes.STRING(100)
        },
        manager_name: {
            type: DataTypes.STRING(20)
        },
        manager_phone_number: {
            type: DataTypes.STRING(20)
        },
        website_url: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.STRING(100)
        },
        decoration_duration: {
            type: DataTypes.STRING(20)
        },
        direction: {
            type: DataTypes.STRING(20)
        },
        structure: {
            type: DataTypes.STRING(100)
        },
        building_area: {
            type: DataTypes.STRING(100)
        },
        rating: {
            type: DataTypes.STRING(50)
        },
        rentable_area: {
            type: DataTypes.STRING(50)
        },
        rentable_area_description: {
            type: DataTypes.STRING(100)
        },
        rent_price: {
            type: DataTypes.STRING(50)
        },
        rent_price_description: {
            type: DataTypes.STRING(100)
        },
        full_rent_price: {
            type: DataTypes.STRING(100)
        },
        rent_duration: {
            type: DataTypes.STRING(100)
        },
        payment_method: {
            type: DataTypes.STRING(100)
        },
        full_block: {
            type: DataTypes.STRING(100)
        },
        ground_floor: {
            type: DataTypes.STRING(100)
        },
        furniture: {
            type: DataTypes.STRING(100)
        },
        services_fees: {
            type: DataTypes.STRING(100)
        },
        motor_parking_fee: {
            type: DataTypes.STRING(100)
        },
        car_parking_fee: {
            type: DataTypes.STRING(100)
        },
        overtime_fee: {
            type: DataTypes.STRING(100)
        },
        electric_bill: {
            type: DataTypes.STRING(100)
        },
        water_bill: {
            type: DataTypes.STRING(100)
        },
        deposit: {
            type: DataTypes.STRING(100)
        },
        brokerage_fee: {
            type: DataTypes.STRING(100)
        },
        latitude: {
            type: DataTypes.STRING(100)
        },
        longitude: {
            type: DataTypes.STRING(100)
        },
        fk_product_created_by: {
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        fk_product_updated_by: {
            type: DataTypes.BIGINT(20).UNSIGNED
        }
    }, {
            tableName: 're_product',
            classMethods: {
                associate: function (models) {
                    Product.belongsTo(models.District, { as: 'district', foreignKey: 'district_id' });
                    Product.belongsTo(models.Ward, { as: 'ward', foreignKey: 'ward_id' });
                    Product.belongsTo(models.City, { as: 'city', foreignKey: 'city_id' });
                    Product.belongsTo(models.Account, { as: 'created_by', foreignKey: 'fk_product_created_by' });
                    Product.belongsTo(models.Account, { as: 'updated_by', foreignKey: 'fk_product_updated_by' });
                    Product.hasMany(models.ProductMetadata);
                    Product.belongsToMany(models.Account, { through: 'ProductAssignment', as: 'assignees' });
                }
            }
        });
    return Product;
};