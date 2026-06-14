'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // PaperItem.belongsTo(models.Papers, {
      //   foreignKey: 'paperId',
      //   as: 'paper',
      // });
      DocumentItem.belongsTo(models.Documents, {
        foreignKey: 'documentId',
        as: 'document',
      });

      DocumentItem.hasOne(models.Files, {
        foreignKey: 'documentId',
        as: 'file',
      });
    }
  }
  DocumentItem.init(
    {
      titleEn: DataTypes.STRING,
      titleTm: DataTypes.STRING,
      titleRu: DataTypes.STRING,
      documentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DocumentItem',
      tableName: 'tbl_document_items',
    }
  );
  return DocumentItem;
};
