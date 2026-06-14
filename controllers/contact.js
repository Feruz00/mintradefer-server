const { catchAsync } = require('../utils/catchAsync');
const { Contact } = require('../models');
const AppError = require('../utils/appError');
const getContact = catchAsync(async (req, res, next) => {
  const data = await Contact.findOne({});
  if (!data) {
    return res.status(404).json({ message: 'Expo data not found' });
  }
  return res.json({ data });
});
const updateContact = async (req, res, next) => {
  try {
    const data = await Contact.findOne({
      where: {},
    });
    if (!data) {
      return next(new AppError('Data not found', 404));
    }

    await data.update({
      ...req.body,
    });
    return res.status(200).json({ data });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getContact, updateContact };
