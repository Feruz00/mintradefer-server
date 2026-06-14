'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_expo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      outsideEn: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      outsideTm: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      outsideRu: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      contentEn: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contentTm: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contentRu: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_expo');
  },
};
