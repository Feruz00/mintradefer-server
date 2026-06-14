const { catchAsync } = require('../utils/catchAsync');
const { Documents, Files, DocumentItem, sequelize } = require('../models');
const AppError = require('../utils/appError');
const { deleteFile } = require('../utils/deleteFile');
const { Op } = require('sequelize');

const getDocuments = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    where: {},
    order: [['id', 'desc']],
    offset: (page - 1) * limit,
    limit: parseInt(limit, 10),
    distinct: true,
  };
  const { count, rows } = await Documents.findAndCountAll(options);
  if (!count) return res.status(200).json({ count: 0, data: [] });
  const data = await Documents.findAll({
    where: { id: rows.map(({ id }) => id) },
    order: [
      ['id', 'DESC'],
      [{ model: DocumentItem, as: 'lists' }, 'id', 'DESC'],
    ],
    include: [
      {
        model: DocumentItem,
        as: 'lists',

        include: [
          {
            model: Files,
            as: 'file',
            attributes: ['id', 'path', 'originalName'],
          },
        ],
      },
    ],
  });
  return res.status(200).json({ count, data });
});

const getDocument = catchAsync(async (req, res, next) => {
  const options = {
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: DocumentItem,
        as: 'lists',
        order: [['id', 'desc']],
        include: [
          {
            model: Files,
            as: 'file',
            attributes: ['id', 'path', 'originalName'],
          },
        ],
      },
    ],
  };

  const data = await Documents.findOne(options);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  return res.status(200).json({ data });
});

const createDocument = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const data = await Documents.create({ ...req.body }, { transaction });

    await transaction.commit();
    return res.status(201).json({ data: data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const updateDocument = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const data = await Documents.findByPk(req.params.id, {
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

const deleteDocument = catchAsync(async (req, res, next) => {
  const data = await Documents.findByPk(req.params.id, {
    include: [
      {
        model: DocumentItem,
        as: 'lists',
        include: [
          {
            model: Files,
            as: 'file',
            attributes: ['id', 'path', 'originalName'],
          },
        ],
      },
    ],
  });
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }

  for (const paper of data?.lists) {
    if (paper && paper.file) {
      deleteFile(paper?.file?.path);
    }
  }

  await data.destroy({});
  return res.status(204).json({});
});

const deleteDocuments = catchAsync(async (req, res, next) => {
  const ids = req.body.ids;

  const results = await Documents.findAll({
    where: { id: { [Op.in]: ids } },
    include: [
      {
        model: DocumentItem,
        as: 'lists',
        include: [
          {
            model: Files,
            as: 'file',
            attributes: ['id', 'path', 'originalName'],
          },
        ],
      },
    ],
  });
  for (const data of results) {
    for (const paper of data?.lists) {
      if (paper && paper.file) {
        deleteFile(paper?.file?.path);
      }
    }
    await data.destroy({});
  }
  return res.status(204).json({});
});

const createDocumentItem = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { fileId } = req.body;

  try {
    const data = await DocumentItem.create({ ...req.body }, { transaction });
    const [file] = await Promise.all([
      Files.findOne({ where: { id: fileId }, transaction }),
    ]);

    if (fileId && !file) {
      await transaction.rollback();
      return next(new AppError('File have error', 400));
    }
    if (file) {
      await data.setFile(file, { transaction });
    }
    await transaction.commit();
    return res.status(201).json({ data: data });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};

const updateDocumentItem = catchAsync(async (req, res, next) => {
  const data = await DocumentItem.findByPk(req.params.id);

  if (!data) {
    return next(new AppError('Item not found', 404));
  }

  await data.update(req.body);

  res.status(200).json({
    data,
  });
});
const deleteDocumentItem = catchAsync(async (req, res, next) => {
  const data = await DocumentItem.findByPk(req.params.id, {
    include: ['file'],
  });

  if (!data) {
    return next(new AppError('Item not found', 404));
  }

  if (data?.file?.path) {
    deleteFile(data?.file?.path);
  }
  await data.destroy();

  res.status(204).json({});
});
module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  deleteDocuments,

  createDocumentItem,
  updateDocumentItem,
  deleteDocumentItem,
};
