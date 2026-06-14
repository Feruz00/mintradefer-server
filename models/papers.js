'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Documents.hasMany(models.DocumentItem, {
        foreignKey: 'documentId',
        as: 'lists',
        onDelete: 'CASCADE',
      });
    }
  }
  Documents.init(
    {
      titleEn: DataTypes.STRING,
      titleTm: DataTypes.STRING,
      titleRu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Documents',
      tableName: 'tbl_documents',
    }
  );
  return Documents;
};
