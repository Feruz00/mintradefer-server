const { catchAsync } = require('../utils/catchAsync');
const { Message } = require('../models');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');
const getMessages = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    where: {},
    order: [['id', 'desc']],
    offset: (page - 1) * limit,
    limit: parseInt(limit, 10),
    distinct: true,
  };

  const { count, rows } = await Message.findAndCountAll(options);
  if (!count) return res.status(200).json({ count: 0, data: [] });
  const data = await Message.findAll({
    where: { id: rows.map(({ id }) => id) },
    order: options.order,
  });
  return res.status(200).json({ count, data });
});

const createMessage = catchAsync(async (req, res, next) => {
  const data = await Message.create(req.body);
  return res.json({ data });
});

const getMessage = catchAsync(async (req, res, next) => {
  const options = {
    where: {
      id: req.params.id,
    },
  };

  const data = await Message.findOne(options);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  return res.status(200).json({ data });
});

const deleteMessage = catchAsync(async (req, res, next) => {
  const data = await Message.findByPk(req.params.id);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }

  await data.destroy({});
  return res.status(204).json({});
});

const deleteMessages = catchAsync(async (req, res, next) => {
  const ids = req.body.ids;

  const results = await Message.findAll({
    where: { id: { [Op.in]: ids } },
  });
  for (const data of results) {
    await data.destroy({});
  }
  return res.status(204).json({});
});

module.exports = {
  getMessages,
  createMessage,
  getMessage,
  deleteMessage,
  deleteMessages,
};
