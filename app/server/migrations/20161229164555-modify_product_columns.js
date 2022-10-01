'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      're_product',
      'rating',
      {
        type: Sequelize.STRING(50)
      }
    );
    queryInterface.changeColumn(
      're_product',
      'rentable_area',
      {
        type: Sequelize.STRING(50)
      }
    );
    queryInterface.changeColumn(
      're_product',
      'rent_price',
      {
        type: Sequelize.STRING(50)
      }
    );
    queryInterface.changeColumn(
      're_product',
      'full_rent_price',
      {
        type: Sequelize.STRING(50)
      }
    );
    queryInterface.addColumn(
      're_product',
      'rentable_area_description',
      {
        type: Sequelize.STRING(100)
      }
    );
    queryInterface.addColumn(
      're_product',
      'rent_price_description',
      {
        type: Sequelize.STRING(100)
      }
    );
  },

  down: function (queryInterface, Sequelize) {

  }
};
