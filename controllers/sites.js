const { catchAsync } = require('../utils/catchAsync');
const { SiteOptions } = require('../models');
const AppError = require('../utils/appError');
const { decrypt } = require('../utils/crypto');

const getSite = catchAsync(async (req, res, next) => {
  const siteOptions = await SiteOptions.findOne();
  res.status(200).json({
    success: true,
    data: {
      ...siteOptions.toJSON(),
      companyNameEn: decrypt(siteOptions.companyNameEn),
      companyNameRu: decrypt(siteOptions.companyNameRu),
      companyNameTm: decrypt(siteOptions.companyNameTm),
    },
  });
});

module.exports = { getSite };
