const { catchAsync } = require('../utils/catchAsync');
const { Events, Files, Categories, sequelize } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/appError');
const { deleteFile } = require('../utils/deleteFile');
const getEvents = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    categoryId,
    title,
    content,
    type,
    status,
  } = req.query;
  const options = {
    where: {},
    order: [['id', 'desc']],
    offset: (page - 1) * limit,
    limit: parseInt(limit, 10),
    distinct: true,
  };
  if (title) options.where.title = { [Op.like]: `%${title}%` };
  if (content) options.where.content = { [Op.like]: `%${content}%` };
  let categories = [];

  if (categoryId && categoryId !== 'all') categories.push(categoryId);
  if (type && categoryId === 'all') {
    let ct = await Categories.findAll({ where: { type } });
    ct = ct.map((r) => r.id);
    categories = [...categories, ...ct];
    if (!categories.length) {
      return res.status(200).json({ count: 0, data: [] });
    }
  }
  if (categories.length) {
    options.where.categoryId = { [Op.in]: categories };
  }

  if (req.clientSide) {
    options.where.status = 'active';
  } else if (status) {
    options.where.status = {
      [Op.in]: status.split(','),
    };
  }

  const { count, rows } = await Events.findAndCountAll(options);
  if (!count) return res.status(200).json({ count: 0, data: [] });
  const data = await Events.findAll({
    where: { id: rows.map(({ id }) => id) },
    order: options.order,
    include: [
      {
        model: Files,
        as: 'files',
        attributes: ['id', 'path', 'originalName'],
      },
      {
        model: Categories,
        as: 'category',
      },
    ],
  });
  return res.status(200).json({ count, data });
});

const getEvent = catchAsync(async (req, res, next) => {
  const options = {
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Files,
        as: 'files',
        attributes: ['id', 'path', 'originalName'],
      },
      {
        model: Categories,
        as: 'category',
      },
    ],
  };
  if (req.clientSide) {
    options.where.status = 'active';
  }
  const data = await Events.findOne(options);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  return res.status(200).json({ data });
});

const createEvent = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { filesId } = req.body;
  try {
    const data = await Events.create({ ...req.body }, { transaction });
    const [files] = await Promise.all([
      Files.findAll({ where: { id: filesId }, transaction }),
    ]);

    if (filesId && files.length !== filesId.length) {
      await transaction.rollback();
      return next(new AppError('Files have error', 400));
    }
    if (files) {
      await data.setFiles(files, { transaction });
    }
    await transaction.commit();
    return res.status(201).json({ data: data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const updateEvent = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { filesId } = req.body;

  try {
    const data = await Events.findByPk(req.params.id, {
      transaction,
    });
    if (!data) {
      await transaction.rollback();
      return next(new AppError('Data not found', 404));
    }
    const [files] = await Promise.all([
      Files.findAll({ where: { id: filesId }, transaction }),
    ]);
    if (filesId && files.length !== filesId.length) {
      await transaction.rollback();
      return next(new AppError('Files have error', 400));
    }
    await data.update(
      {
        ...req.body,
      },
      { transaction }
    );
    if (files) {
      await data.setFiles(files, { transaction });
    }
    await transaction.commit();
    return res.status(200).json({ data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const deleteEvent = catchAsync(async (req, res, next) => {
  const data = await Events.findByPk(req.params.id, {
    include: ['files'],
  });
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  for (const file of data?.files) {
    deleteFile(file.path);
  }
  await data.destroy({});
  return res.status(204).json({});
});
const deleteEvents = catchAsync(async (req, res, next) => {
  const ids = req.body.ids;

  const results = await Events.findAll({
    where: { id: { [Op.in]: ids } },
    include: ['files'],
  });
  for (const data of results) {
    for (const file of data?.files) {
      deleteFile(file.path);
    }
    await data.destroy({});
  }
  return res.status(204).json({});
});

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteEvents,
};
