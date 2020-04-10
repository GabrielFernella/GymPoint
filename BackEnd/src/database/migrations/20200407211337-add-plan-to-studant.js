'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'students',
      'plan_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
      },
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('students', 'plan_id');
  }
};
