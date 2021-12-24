"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.Products, {
        foreignKey: "productId",
        as: "Product",
      });
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Cart.init(
    {
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      paymentMethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
      timestamps: true,
    }
  );
  return Cart;
};
