const { catchAsync } = require('../utils/catchAsync');
const { Expo, Files, sequelize } = require('../models');
const AppError = require('../utils/appError');
const getExpo = catchAsync(async (req, res, next) => {
  const data = await Expo.findOne({
    include: [
      {
        model: Files,
        as: 'files',
        attributes: ['id', 'path', 'originalName'],
      },
    ],
  });
  if (!data) {
    return res.status(404).json({ message: 'Expo data not found' });
  }
  return res.json({ data });
});

const updateExpo = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  const { filesId } = req.body;

  try {
    const data = await Expo.findOne({
      where: {},
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

module.exports = { getExpo, updateExpo };
