const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { catchAsync } = require('../utils/catchAsync');
const { cookieOptions } = require('../utils/constants');
const AppError = require('../utils/appError');

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.user) {
    token = req.cookies.user;
  }

  if (!token) {
    res.clearCookie('user', cookieOptions);

    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    res.clearCookie('user', cookieOptions);
    return next(
      new AppError('Token is invalid or expired. Please login again.', 401)
    );
  }
  let currentUser;
  currentUser = await Users.findByPk(decoded.id, {
    attributes: { exclude: ['password'] },
  });

  if (!currentUser) {
    res.clearCookie('user', cookieOptions);

    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }
  if (currentUser.status !== 'active') {
    return next(new AppError(`Your account now ${currentUser.status}`, 403));
  }
  await currentUser.update({ lastLogin: new Date() });
  currentUser = await currentUser.toJSON();

  req.user = currentUser;

  next();
});

module.exports = { protect };
