const { catchAsync } = require('../utils/catchAsync');
const { Categories } = require('../models');
const getCategories = catchAsync(async (req, res, next) => {
  const { type } = req.query;
  const options = {
    where: {},
  };
  if (type) {
    options.where.type = type;
  }
  const data = await Categories.findAll(options);
  return res.json({ data });
});

module.exports = { getCategories };
