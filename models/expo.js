'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expo.hasMany(models.Files, {
        foreignKey: 'expoId',
        as: 'files',
      });
    }
  }
  Expo.init(
    {
      date: DataTypes.DATE,
      contentEn: DataTypes.TEXT,
      contentRu: DataTypes.TEXT,
      contentTm: DataTypes.TEXT,

      outsideEn: DataTypes.TEXT,
      outsideTm: DataTypes.TEXT,
      outsideRu: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: 'tbl_expo',
      modelName: 'Expo',
    }
  );
  return Expo;
};
