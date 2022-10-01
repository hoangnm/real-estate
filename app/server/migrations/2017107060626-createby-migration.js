'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
            're_customer',
            'fk_customer_created_by',
            {
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: {
                    model: 're_account',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null'
            }
        );
        queryInterface.addColumn(
            're_customer',
            'fk_customer_updated_by',
            {
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: {
                    model: 're_account',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null'
            }
        );

        queryInterface.addColumn(
            're_product',
            'fk_product_created_by',
            {
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: {
                    model: 're_account',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null'
            }
        );
        queryInterface.addColumn(
            're_product',
            'fk_product_updated_by',
            {
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: {
                    model: 're_account',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null'
            }
        );

        queryInterface.addColumn(
            're_account',
            'fk_account_created_by',
            {
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: {
                    model: 're_account',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null'
            }
        );
        queryInterface.addColumn(
            're_account',
            'fk_account_updated_by',
            {
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: {
                    model: 're_account',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'set null'
            }
        );
    },

    down: function (queryInterface, Sequelize) {

    }
};
