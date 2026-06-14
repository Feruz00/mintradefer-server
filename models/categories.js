'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {}
  }

  Categories.init(
    {
      nameTm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Turkmen name is required',
          },
          notEmpty: {
            msg: 'Turkmen name cannot be empty',
          },
          len: {
            args: [2, 100],
            msg: 'Turkmen name must be between 2 and 100 characters',
          },
          isValidName(value) {
            if (!value.trim()) {
              throw new Error('Turkmen name cannot contain only spaces');
            }
          },
        },
      },

      nameRu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Russian name is required',
          },
          notEmpty: {
            msg: 'Russian name cannot be empty',
          },
          len: {
            args: [2, 100],
            msg: 'Russian name must be between 2 and 100 characters',
          },
        },
      },

      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'English name is required',
          },
          notEmpty: {
            msg: 'English name cannot be empty',
          },
          len: {
            args: [2, 100],
            msg: 'English name must be between 2 and 100 characters',
          },
          is: {
            args: /^[A-Za-z0-9\s\-_'&]+$/i,
            msg: 'English name contains invalid characters',
          },
        },
      },

      type: {
        type: DataTypes.ENUM('local', 'international'),
        defaultValue: 'local',
      },
    },
    {
      sequelize,
      modelName: 'Categories',
      tableName: 'tbl_categories',

      validate: {
        atLeastOneDifferentLanguage() {
          if (this.nameTm === this.nameRu && this.nameRu === this.nameEn) {
            throw new Error('Category names should not all be identical');
          }
        },
      },
    }
  );

  return Categories;
};
