'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tbl_categories',
      [
        {
          nameTm: 'Syýasat',
          nameRu: 'Политика',
          nameEn: 'Policits',
          type: 'local',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nameTm: 'Ykdysadyýet',
          nameRu: 'Экономика',
          nameEn: 'Economics',
          type: 'international',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_categories', null, {});
  },
};
