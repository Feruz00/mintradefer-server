'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.hasMany(models.Files, {
        foreignKey: 'postId',
        as: 'files',
      });
    }
  }
  Posts.init(
    {
      titleEn: DataTypes.STRING,
      titleTm: DataTypes.STRING,
      titleRu: DataTypes.STRING,

      contentEn: DataTypes.TEXT,
      contentTm: DataTypes.TEXT,
      contentRu: DataTypes.TEXT,
      type: {
        type: DataTypes.ENUM('local', 'international', 'expo'),
        defaultValue: 'local',
      },
      status: DataTypes.ENUM('active', 'deactive'),
    },
    {
      sequelize,
      modelName: 'Posts',
      tableName: 'tbl_posts',
    }
  );
  return Posts;
};
