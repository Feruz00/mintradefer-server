'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enterprises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enterprises.hasMany(models.Files, {
        foreignKey: 'enterpriseId',
        as: 'files',
      });
    }
  }
  Enterprises.init(
    {
      type: {
        type: DataTypes.ENUM(
          'ashgabat',
          'balkan',
          'ahal',
          'mary',
          'lebap',
          'dashoguz'
        ),
        allowNull: false,
      },
      workAreaEn: DataTypes.STRING,
      workAreaTm: DataTypes.STRING,
      workAreaRu: DataTypes.STRING,

      worksEn: DataTypes.STRING,
      worksTm: DataTypes.STRING,
      worksRu: DataTypes.STRING,

      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      fax: DataTypes.STRING,
      url: DataTypes.STRING,
      titleEn: DataTypes.STRING,
      titleTm: DataTypes.STRING,
      titleRu: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('active', 'deactive'),
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Enterprises',
      tableName: 'tbl_enterprises',
    }
  );
  return Enterprises;
};
