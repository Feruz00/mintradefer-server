'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_events', {
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
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbl_categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('tbl_events');
  },
};
