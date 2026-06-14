'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const images = [
      'uploads/test/1.webp',
      'uploads/test/2.webp',
      'uploads/test/3.webp',
    ];
    const posts = [];

    for (let i = 1; i <= 500; i++) {
      const randomPhoto = images[Math.floor(Math.random() * images.length)];

      posts.push({
        path: randomPhoto,
        originalName: randomPhoto.split('/').pop(), // Извлечение имени файла
        mimetype: 'image/jpeg', // Замените на нужный тип, если требуется
        size: Math.floor(Math.random() * 5000000), // Случайный размер до 5MB
        cover: 1,
        postId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const events = [];

    for (let i = 1; i <= 500; i++) {
      const randomPhoto = images[Math.floor(Math.random() * images.length)];

      events.push({
        path: randomPhoto,
        originalName: randomPhoto.split('/').pop(), // Извлечение имени файла
        mimetype: 'image/jpeg', // Замените на нужный тип, если требуется
        size: Math.floor(Math.random() * 5000000), // Случайный размер до 5MB
        cover: 1,
        eventId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const expo = [];
    for (let i = 1; i <= 5; i++) {
      expo.push({
        path: 'uploads/test/expo_2020.webp',
        originalName: 'expo_2020.webp', // Извлечение имени файла
        mimetype: 'image/jpeg', // Замените на нужный тип, если требуется
        size: Math.floor(Math.random() * 5000000), // Случайный размер до 5MB
        cover: 1,
        expoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const enterprises = [];

    for (let i = 1; i <= 60; i++) {
      const randomPhoto = images[Math.floor(Math.random() * images.length)];

      enterprises.push({
        path: randomPhoto,
        originalName: randomPhoto.split('/').pop(), // Извлечение имени файла
        mimetype: 'image/jpeg', // Замените на нужный тип, если требуется
        size: Math.floor(Math.random() * 5000000), // Случайный размер до 5MB
        cover: 1,
        enterpriseId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const papers = [];

    for (let i = 1; i <= 300; i++) {
      papers.push({
        path: 'uploads/test/paper.xlsx',
        originalName: 'xlsx', // Извлечение имени файла
        mimetype: 'image/jpeg', // Замените на нужный тип, если требуется
        size: Math.floor(Math.random() * 5000000), // Случайный размер до 5MB
        cover: 1,
        documentId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert(
      'tbl_files',
      [...posts, ...events, ...expo, ...enterprises, ...papers],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_files', null, {});
  },
};
