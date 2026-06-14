'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titleEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titleRu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titleTm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contentEn: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contentRu: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contentTm: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('local', 'international', 'expo'),
        defaultValue: 'local',
      },
      status: {
        type: Sequelize.ENUM('active', 'deactive'),
        defaultValue: 'active',
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
    await queryInterface.dropTable('tbl_posts');
  },
};
