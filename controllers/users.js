const { catchAsync } = require('../utils/catchAsync');
const { Users, Files, sequelize } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/appError');
const { toHash } = require('../utils/hash');

const getUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    where: {},
    order: [['id', 'desc']],
    offset: (page - 1) * limit,
    limit: parseInt(limit, 10),
    distinct: true,
  };

  const { count, rows } = await Users.findAndCountAll(options);
  if (!count) return res.status(200).json({ count: 0, data: [] });
  const data = await Users.findAll({
    where: { id: rows.map(({ id }) => id) },
    order: options.order,
    attributes: {
      exclude: ['password'],
    },
  });
  return res.status(200).json({ count, data });
});

const getUser = catchAsync(async (req, res, next) => {
  const options = {
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['password'],
    },
  };

  const data = await Users.findOne(options);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  return res.status(200).json({ data });
});

const createUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const hashPassword = await toHash(req.body.password);

    const data = await Users.create(
      { ...req.body, password: hashPassword },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json({ data: data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  const { password, ...others } = req.body;
  try {
    const data = await Users.findByPk(req.params.id, {
      transaction,
    });
    if (!data) {
      await transaction.rollback();
      return next(new AppError('Data not found', 404));
    }
    const newUpdateDate = { ...others };
    if (password) {
      const hashPassword = await toHash(password);
      newUpdateDate.password = hashPassword;
    }
    await data.update(newUpdateDate, { transaction });

    await transaction.commit();
    return res.status(200).json({ data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};
const deleteUser = catchAsync(async (req, res, next) => {
  const data = await Users.findByPk(req.params.id);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  if (data.id === req.user.id) {
    return next(new AppError('You cannot delete yourself', 400)); // Fixed error message
  }
  await data.destroy({});
  return res.status(204).json({});
});

const deleteUsers = catchAsync(async (req, res, next) => {
  const ids = req.body.ids?.filter((id) => id !== req.user.id);

  const results = await Users.findAll({
    where: { id: { [Op.in]: ids } },
  });
  for (const data of results) {
    await data.destroy({});
  }
  return res.status(204).json({});
});
module.exports = {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  deleteUsers,
};
