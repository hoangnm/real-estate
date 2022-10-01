'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      're_district',
      'city_id',
      {
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {
          model: 're_city',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
      }
    );
    queryInterface.addColumn(
      're_ward',
      'district_id',
      {
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {
          model: 're_district',
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
