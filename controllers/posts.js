const { catchAsync } = require('../utils/catchAsync');
const { Posts, Files, sequelize } = require('../models');
const { Op } = require('sequelize');
const { deleteFile } = require('../utils/deleteFile');
const AppError = require('../utils/appError');
const getPosts = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, title, content, type, status } = req.query;
  const options = {
    where: {},
    order: [['id', 'desc']],
    offset: (page - 1) * limit,
    limit: parseInt(limit, 10),
    distinct: true,
  };
  if (title) options.where.title = { [Op.like]: `%${title}%` };
  if (content) options.where.content = { [Op.like]: `%${content}%` };
  if (type) options.where.type = type;

  if (req.clientSide) {
    options.where.status = 'active';
  } else if (status) {
    options.where.status = {
      [Op.in]: status.split(','),
    };
  }

  const { count, rows } = await Posts.findAndCountAll(options);
  if (!count) return res.status(200).json({ count: 0, data: [] });
  const data = await Posts.findAll({
    where: { id: rows.map(({ id }) => id) },
    order: options.order,
    include: [
      {
        model: Files,
        as: 'files',
        attributes: ['id', 'path', 'originalName'],
      },
    ],
  });
  return res.status(200).json({ count, data });
});
const getPost = catchAsync(async (req, res, next) => {
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
    ],
  };
  if (req.clientSide) {
    options.where.status = 'active';
  }
  const data = await Posts.findOne(options);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  return res.status(200).json({ data });
});

const createPost = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { filesId } = req.body;
  try {
    const data = await Posts.create({ ...req.body }, { transaction });
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

const updatePost = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { filesId } = req.body;

  try {
    const data = await Posts.findByPk(req.params.id, {
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

const deletePost = catchAsync(async (req, res, next) => {
  const data = await Posts.findByPk(req.params.id, {
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

const deletePosts = catchAsync(async (req, res, next) => {
  const ids = req.body.ids;

  const results = await Posts.findAll({
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
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deletePosts,
};
