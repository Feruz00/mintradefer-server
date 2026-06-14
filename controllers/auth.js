const { Users } = require('../models');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { cookieOptions } = require('../utils/constants');
const { compare } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }

  const user = await Users.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return next(new AppError('Invalid username or password.', 401));
  }

  const passwordIsValid = await compare(user.password, password);

  if (!passwordIsValid) {
    return next(new AppError('Incorrect username or password', 401));
  }

  if (user.status !== 'active') {
    return next(new AppError(`Your account now ${user.status}`, 403));
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    // expiresIn: `${expiresInDays}d`, // custom expiration
    expiresIn: `30d`, // custom expiration
  });
  res.cookie('user', token, { ...cookieOptions, maxAge: 30 * 60 * 60 * 1000 });
  return res.status(200).json({
    status: 'success',

    data: {
      user,
    },
  });
});

const currentUser = catchAsync(async (req, res, next) => {
  const user = await Users.findByPk(req.user.id, {
    attributes: {
      exclude: ['password'],
    },
  });
  return res.json({
    data: user,
  });
});

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie('user', cookieOptions);
  return res.status(200).json({ status: 'success' });
});
module.exports = { login, currentUser, logout };
