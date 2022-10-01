'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      're_customer',
      'customer_status_id',
      {
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {
          model: 're_customer_status',
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
