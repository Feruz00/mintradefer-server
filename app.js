const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const session = require('express-session');
const errorHandler = require('./utils/errorHandler');
const xss = require('xss');
const hpp = require('hpp');
const compression = require('compression');
const AppError = require('./utils/appError');

const app = express();

app.set('trust proxy', 1);
app.use(cookieParser());
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? '*'
    : ['http://localhost:3000', 'http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/banner', require('./routes/banner'));
app.use('/api/events', require('./routes/events'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/expo', require('./routes/expo'));
app.use('/api/tenders', require('./routes/tenders'));
app.use('/api/enterprises', require('./routes/enterprises'));

app.use('/api/messages', require('./routes/messages'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/documents', require('./routes/documents'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/files'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contact', require('./routes/contact'));

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
