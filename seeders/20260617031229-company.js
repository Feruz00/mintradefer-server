'use strict';

const { encrypt } = require('../utils/crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    const company = [
      {
        companyNameEn: encrypt(
          'Ministry of Trade and Foreign Economic Relations of Turkmenistan'
        ),
        companyNameRu: encrypt(
          'Министерство торговли и внешнеэкономических связей Туркменистана'
        ),
        companyNameTm: encrypt(
          'Türkmenistanyň Söwda we daşary ykdysady aragatnaşyklar ministrligi'
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('tbl_site_options', company, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_site_options', null, {});
  },
};
