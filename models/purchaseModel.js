"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchase.hasMany(models.Products, {
        foreignKey: "productId",
        as: "products",
      });
    }
  }
  Purchase.init(
    {
      dealerName: DataTypes.STRING,
      costPrice: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      stockPerDeal: DataTypes.INTEGER,
      dateOfPurchase: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );
  return Purchase;
};
