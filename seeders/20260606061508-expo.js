'use strict';

const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const outside = `Türkmenistanyň Daşary işler ministrliginde Türkmenistanyň daşary işler ministriniň orunbasary Mähri Bäşimowa Aşgabat şäherine iş sapary bilen gelen Italiýa Respublikasynyň EXPO-2030 geçirmeklige dalaşgärlik komitetiniň Ýörite Ilçisi Romeo Orlandi bilen duşuşygy gecirildi.
Gepleşikleriň dowamynda taraplar türkmen-italýan hyzmatdaşlygynyň ýagdaýy we geljekki mümkinçilikleri barada durup geçdiler. Iki ýurduň arasyndaky gatnaşyklary ikitaraplaýyn görnüşde we köptaraplaýyn diplomatiýanyň çäklerinde mundan beýläk hem ösdürmek üçin özara taýýarlygy beýan edildi.
Duşuşygyň esasy maksady 2030-njy ýylda EXPO-ny Italiýada geçirmek boýunça dalaşgärligini öňe sürmeginiň konsepsiýasy bilen tanyşdyrmakdan ybarat boldy.`;

    const content =
      'Berkarar döwletiň täze eýýamynyň Galkynyşy döwründe Türkmenistanyň halkara abraýyny has-da belende galdyrmak, ýurdumyzda durmuş-ykdysady ugurlarda gazanylýan üstünlikleri dünýä ýaýmak, daşary ýurtlar bilen söwda-ykdysady gatnaşyklary ösdürmek maksady bilen, Türkmenistanyň Prezidenti Karara gol çekdi.Resminama laýyklykda, Söwda we daşary ykdysady aragatnaşyklar ministrligine Ýaponiýanyň Osaka şäherinde 2025-nji ýylda geçiriljek “EKSPO — 2025” Bütindünýä sergisine gatnaşmak üçin Türkmenistanyň milli pawilýonynyň taslamasyny düzmek we ony ýanaşyk ýerlerini abadanlaşdyryp, ulanmaga doly taýýar edip gurmak hem-de beýleki degişli işleri ýerine ýetirmek barada “Belli” hojalyk jemgyýeti bilen şertnama baglaşmaga ygtyýar berildi.';

    await queryInterface.bulkInsert(
      'tbl_expo',
      [
        {
          outsideEn: 'English ' + outside,
          outsideTm: 'Turkmen ' + outside,
          outsideRu: 'Ruski ' + outside,

          contentEn: 'English ' + content,
          contentTm: 'Turkmen ' + content,
          contentRu: 'Ruski ' + content,

          date: dayjs('12.12.2026', 'DD.MM.YYYY').toDate(),
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
    await queryInterface.bulkDelete('tbl_expo', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
