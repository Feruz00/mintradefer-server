'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM('active', 'deactive', 'blocked'),
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'tbl_users',
    }
  );
  return Users;
};
