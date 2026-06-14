'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tbl_banners',
      [
        {
          path: 'uploads/test/banner.webp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          path: 'uploads/test/banner.webp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          path: 'uploads/test/banner.webp',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete('tbl_banners', null, {});
  },
};
