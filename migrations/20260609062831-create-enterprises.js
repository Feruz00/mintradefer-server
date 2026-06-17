'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_enterprises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM(
          'ashgabat',
          'balkan',
          'ahal',
          'mary',
          'lebap',
          'dashoguz'
        ),
        allowNull: false,
      },
      workAreaEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      workAreaTm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      workAreaRu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      worksEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      worksTm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      worksRu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fax: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('tbl_enterprises');
  },
};
