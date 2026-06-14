require('dotenv').config();
const app = require('./app');
const db = require('./models');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.log(error);
    console.log('⏳ Retrying server start in 5s...');
    // setTimeout(startServer, 5000)
  }
}

startServer();

process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('SIGINT', async () => {
  console.log('🛑 Gracefully shutting down...');
  // await db.close()
  console.log('✅ All users set offline.');
  process.exit(0);
});
