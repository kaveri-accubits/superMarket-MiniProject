"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // unitId is the foreign key of product
      this.hasMany(models.Products, {
        foreignKey: "unitId",
        as: "unit",
      });
    }
  }
  unit.init(
    {
      unitName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "unit",
    },
    //freeze table name
    {
      freezeTableName: true,
    }
  );
  return unit;
};
