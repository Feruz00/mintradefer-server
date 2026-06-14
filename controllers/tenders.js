const { catchAsync } = require('../utils/catchAsync');
const { Tenders, sequelize } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/appError');
const getTenders = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, status, type } = req.query;
  const options = {
    where: {},
    order: [['id', 'desc']],
    offset: (page - 1) * limit,
    limit: parseInt(limit, 10),
    distinct: true,
  };
  if (type) options.where.type = type;
  if (req.clientSide) {
    options.where.status = 'active';
  } else if (status) {
    options.where.status = {
      [Op.in]: status.split(','),
    };
  }
  const { count, rows } = await Tenders.findAndCountAll(options);
  if (!count) return res.status(200).json({ count: 0, data: [] });
  const data = await Tenders.findAll({
    where: { id: rows.map(({ id }) => id) },
    order: options.order,
  });
  return res.status(200).json({ count, data });
});

const getTender = catchAsync(async (req, res, next) => {
  const data = await Tenders.findByPk(req.params.id, {});
  if (!data) {
    return next(new AppError('Data not found', 404));
  }
  return res.status(200).json({ data });
});

const createTender = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const data = await Tenders.create({ ...req.body }, { transaction });

    await transaction.commit();
    return res.status(201).json({ data: data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const updateTender = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const data = await Tenders.findByPk(req.params.id, {
      transaction,
    });
    if (!data) {
      await transaction.rollback();
      return next(new AppError('Data not found', 404));
    }
    await data.update(
      {
        ...req.body,
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json({ data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const deleteTender = catchAsync(async (req, res, next) => {
  const data = await Tenders.findByPk(req.params.id);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }

  await data.destroy({});
  return res.status(204).json({});
});

const deleteTenders = catchAsync(async (req, res, next) => {
  const ids = req.body.ids;

  const results = await Tenders.findAll({
    where: { id: { [Op.in]: ids } },
  });
  for (const data of results) {
    await data.destroy({});
  }
  return res.status(204).json({});
});

module.exports = {
  getTenders,
  getTender,
  createTender,
  updateTender,
  deleteTender,
  deleteTenders,
};
