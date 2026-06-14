'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tbl_contacts',
      [
        {
          address: '744000, Türkmenistan, Aşgabat Arçabil şaýoly, 52',
          phoneNumber: '+(993) 12 44-64-66',
          email: 'tsdyam@gmail.com',
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
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_contacts', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
  },
};
