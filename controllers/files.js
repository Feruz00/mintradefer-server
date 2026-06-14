const { catchAsync } = require('../utils/catchAsync');
const { Files } = require('../models');
const fs = require('fs/promises');
const path = require('path');

const AppError = require('../utils/appError');

const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  let { size, mimetype, path: filePath } = req.file;
  const encodedFilename = Buffer.from(req.file.originalname, 'latin1')
    .toString('utf8')
    .split(' ')
    .join('_');

  const file = await Files.create({
    originalName: encodedFilename,
    size,
    mimetype,
    path: filePath,
  });

  res.json(file);
});

const deleteFile = catchAsync(async (req, res, next) => {
  const file = await Files.findByPk(req.params.id);

  if (!file) {
    return next(new AppError('File not found', 404));
  }

  await file.destroy();

  return res.json({ status: 'success', message: 'File deleted successfully' });
});

const getAll = catchAsync(async (req, res, next) => {
  const data = await Files.findAll({ where: {} });

  res.status(200).json({
    data,
  });
});

const getOne = catchAsync(async (req, res, next) => {
  const data = await Files.findByPk(req.params.id);

  res.status(200).json({
    data,
  });
});

const multipleUpload = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const uploadedFiles = [];

  for (const file of req.files) {
    const { originalname, size, mimetype, path } = file;
    const encodedFilename = Buffer.from(originalname, 'latin1')
      .toString('utf8')
      .split(' ')
      .join('_');

    const newFile = await Files.create({
      originalName: encodedFilename,
      size,
      mimetype,
      path,
    });

    uploadedFiles.push(newFile);
  }

  res.status(201).json({ files: uploadedFiles });
});

const recoverFile = catchAsync(async (req, res, next) => {
  const file = await Files.findByPk(req.params.id, { paranoid: false });

  if (!file) {
    return next(new AppError('File not found', 404));
  }

  await file.restore();

  res.json({ status: 'success', message: 'File recovered successfully', file });
});

const permanentlyDeleteFile = catchAsync(async (req, res, next) => {
  const file = await Files.findByPk(req.params.id, { paranoid: false });

  if (!file) {
    return next(new AppError('File not found', 404));
  }

  const absolutePath = file.path;

  try {
    if (absolutePath)
      await fs.unlink(absolutePath).catch((err) => {
        if (err.code !== 'ENOENT') throw err;
      });
  } catch (err) {
    console.error('Failed to delete file(s):', err);
    return next(new AppError('Error deleting file from disk', 500));
  }

  await file.destroy({ force: true });

  res.json({ status: 'success', message: 'File permanently deleted' });
});
module.exports = {
  uploadFile,
  deleteFile,
  getAll,
  multipleUpload,
  getOne,
  recoverFile,
  permanentlyDeleteFile,
};
