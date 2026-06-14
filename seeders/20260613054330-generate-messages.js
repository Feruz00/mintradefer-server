'use strict';

const firstNames = [
  'John',
  'Jane',
  'Michael',
  'Sarah',
  'David',
  'Emma',
  'Daniel',
  'Olivia',
  'James',
  'Sophia',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Miller',
  'Davis',
  'Wilson',
  'Taylor',
  'Anderson',
];

const messages = [
  'I would like to get more information about your services.',
  'Please contact me regarding my recent inquiry.',
  'Thank you for the excellent service and support.',
  'I have a question about your products.',
  'Can you provide additional details about pricing?',
  'Looking forward to hearing from your team.',
  'I am interested in collaborating with your company.',
  'Please let me know the next steps.',
  'I appreciate your quick response.',
  'This is a test message submitted through the contact form.',
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  async up(queryInterface) {
    const rows = [];

    for (let i = 1; i <= 300; i++) {
      const firstName = randomItem(firstNames);
      const lastName = randomItem(lastNames);

      rows.push({
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
        phone: `+9936${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
        message: randomItem(messages),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('tbl_messages', rows, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tbl_messages', null, {});
  },
};
