'use strict';

const { toHash } = require('../utils/hash');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await toHash('test12345');
    const now = new Date();
    let users = [{ username: 'admin', password: password, status: 'active' }];
    const statuses = ['active', 'deactive', 'blocked'];

    for (let i = 1; i <= 30; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      users.push({
        username: `user${i}`,
        status,
        password,
        status,
      });
    }

    users = users.map((user) => ({ ...user, createdAt: now, updatedAt: now }));
    await queryInterface.bulkInsert('tbl_users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_users', null, {});
  },
};
