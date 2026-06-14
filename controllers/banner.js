const { catchAsync } = require('../utils/catchAsync');
const { Banner, Files, sequelize } = require('../models');
const AppError = require('../utils/appError');
const { deleteFile } = require('../utils/deleteFile');
const getBanner = catchAsync(async (req, res, next) => {
  const data = await Banner.findAll({});
  return res.json({ data });
});

const createBanner = async (req, res, next) => {
  const { filesId } = req.body;

  try {
    const data = await Banner.findOne({
      where: {},
    });
    if (!data) {
      return next(new AppError('Data not found', 404));
    }
    const [files] = await Promise.all([
      Files.findAll({ where: { id: filesId } }),
    ]);
    if (filesId && files.length !== filesId.length) {
      return next(new AppError('Files have error', 400));
    }

    files.forEach(async (file) => {
      await Banner.create({ path: file.path });
    });
    files.forEach(async (file) => {
      await file.destroy({});
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};

const deleteBanner = catchAsync(async (req, res, next) => {
  const data = await Banner.findByPk(req.params.id);
  if (!data) {
    return next(new AppError('Data not found', 404)); // Fixed error message
  }
  deleteFile(data.path);

  await data.destroy({});
  return res.status(204).json({});
});
module.exports = { getBanner, deleteBanner, createBanner };
