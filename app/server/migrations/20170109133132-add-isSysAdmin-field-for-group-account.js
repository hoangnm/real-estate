'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      're_group_account',
      'is_sys_admin',
      {
        type: Sequelize.BOOLEAN
      }
    );
  },

  down: function (queryInterface, Sequelize) {

  }
};
