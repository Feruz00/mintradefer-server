'use strict';

const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const titles = [
      '“Eni Türkmenistan Limited” liniýa turbalaryny we klapanlary satyn almak üçin tender yglan edýär',
    ];
    const contents = [
      '<p>“Eni Türkmenistan Limited” 2023-2024-nji ýyllar üçin täze guýular üçin nebit liniýalary üçin turbalary, armaturlary we klapanlary satyn almak üçin 1110113083 bäsleşige gatnaşmak üçin teklipleriň deslapky ýygyndysyny yglan edýär.Bäsleşigiň ýapyljak senesi - 2323 (Türkmen wagty) 2023-nji ýylyň 22-nji awgusty.Bäsleşige gatnaşmak üçin resmi çakylyk almak üçin ähli gyzyklanýan kompaniýalar Şertnama we satyn alyş bölümine resmi ýüz tutmaly.</p>',
    ];

    const phoneNumber = [99365127566];
    const types = ['local', 'international'];
    let postCount = 500;
    const arr = [];
    const titleLen = titles.length - 1;
    const contentLen = contents.length - 1;
    const typesLen = types.length - 1;

    while (postCount--) {
      const randomTitle = titles[Math.floor(Math.random() * titleLen)];
      const randomContent = contents[Math.floor(Math.random() * contentLen)];
      const randomType = types[Math.floor(Math.random() * typesLen)];
      const stDate = Math.floor(Math.random() * 50);
      const enDate = Math.floor(Math.random() * 50);

      arr.push({
        titleTm: 'Turkmen ' + randomTitle,
        titleEn: 'English ' + randomTitle,
        titleRu: 'Russki ' + randomTitle,

        contentEn: 'English ' + randomContent,
        contentRu: 'Russki ' + randomContent,
        contentTm: 'Turkmen ' + randomContent,
        tenderNumber: `${Math.floor(Math.random() * 100000000)}`,
        phoneNumber: '+99365123456',
        type: randomType,
        email: 'user@mail.ru',
        address: 'Aşgabat, Türkmenistan',
        status: Math.random() > 0.7 ? 'deactive' : 'active',
        startDate: dayjs().subtract(enDate, 'days').toDate(),
        endDate: dayjs().add(enDate, 'days').toDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log(arr);
    await queryInterface.bulkInsert('tbl_tenders', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_tenders', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
  },
};
