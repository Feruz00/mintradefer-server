'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tenders.init(
    {
      titleEn: DataTypes.STRING,
      titleTm: DataTypes.STRING,
      titleRu: DataTypes.STRING,

      contentEn: DataTypes.TEXT,
      contentTm: DataTypes.TEXT,
      contentRu: DataTypes.TEXT,

      status: DataTypes.ENUM('active', 'deactive'),

      tenderNumber: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      type: {
        type: DataTypes.ENUM('local', 'international'),
        defaultValue: 'local',
      },
    },
    {
      sequelize,
      modelName: 'Tenders',
      tableName: 'tbl_tenders',
    }
  );
  return Tenders;
};
