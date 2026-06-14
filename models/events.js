'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Events.belongsTo(models.Categories, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      Events.hasMany(models.Files, {
        foreignKey: 'eventId',
        as: 'files',
      });
    }
  }
  Events.init(
    {
      titleEn: DataTypes.STRING,
      titleTm: DataTypes.STRING,
      titleRu: DataTypes.STRING,

      contentEn: DataTypes.TEXT,
      contentTm: DataTypes.TEXT,
      contentRu: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM('active', 'deactive'),
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Events',
      tableName: 'tbl_events',
    }
  );
  return Events;
};
