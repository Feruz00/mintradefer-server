'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteOptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SiteOptions.init(
    {
      companyNameEn: DataTypes.TEXT,
      companyNameRu: DataTypes.TEXT,
      companyNameTm: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'SiteOptions',
      tableName: 'tbl_site_options',
    }
  );
  return SiteOptions;
};
