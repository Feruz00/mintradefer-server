require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'secure',
    password: process.env.DB_PASSWORD || 'Password',
    database: process.env.DB_DATABASE || 'news',
    host: process.env.DB_HOST || '192.168.137.20',
    port: 3306,
    dialect: 'mysql',
    logging: false,
  },

  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
  },

  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'database_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    // pool: {
    //   max: 200,
    //   min: 0,
    //   acquire: 60000,
    //   idle: 30000,
    // },
    // dialectOptions: {
    //   connectTimeout: 60000,
    // },
    // retry: {
    //   max: 5,
    // },
    logging: false,
  },
};
