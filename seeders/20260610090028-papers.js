'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const papers = [];
    const items = [];

    for (let i = 1; i <= 30; i++) {
      papers.push({
        titleEn: 'English ' + `Resmi kagyz görnüş ${i}`,
        titleTm: 'Turkmen ' + `Resmi kagyz görnüş ${i}`,
        titleRu: 'Ruski ' + `Resmi kagyz görnüş ${i}`,

        createdAt: new Date(),
        updatedAt: new Date(),
      });
      for (let j = 1; j <= 10; j++) {
        items.push({
          titleEn: `Nusga №${i}.${j}`,
          titleTm: `Nusga №${i}.${j}`,
          titleRu: `Nusga №${i}.${j}`,
          documentId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('tbl_documents', papers, {});
    await queryInterface.bulkInsert('tbl_document_items', items, {});
    /**
     * Add seed commands here.
     *
     * Example:
     
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_documents', null, {});
    await queryInterface.bulkDelete('tbl_document_items', null, {});
  },
};
