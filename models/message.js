'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {}
  }

  Message.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'First name is required',
          },
          notNull: {
            msg: 'First name cannot be empty',
          },
        },
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Last name is required',
          },
          notNull: {
            msg: 'Last name cannot be empty',
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Please enter a valid email address',
          },
          notNull: {
            msg: 'Email cannot be empty',
          },
        },
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Phone number is required',
          },
          notNull: {
            msg: 'Phone number cannot be empty',
          },
        },
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Message cannot be empty',
          },
          len: {
            args: [5, 2000],
            msg: 'Message must be between 5 and 2000 characters',
          },
          notNull: {
            msg: 'Message is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'tbl_messages',
    }
  );

  return Message;
};
