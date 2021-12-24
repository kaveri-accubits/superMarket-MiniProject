"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sales.hasMany(models.Products, {
        foreignKey: "productId",
        as: "Product",
      });
      sales.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  sales.init(
    {
      paymentMethod: DataTypes.STRING,
      purchaseDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sales",
    }
  );
  return sales;
};
