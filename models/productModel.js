"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // productId is the foreign key of purchase
      this.belongsTo(models.Purchase, {
        foreignKey: "productId",
        as: "products",
      });
      // productId is the foreign key of cart
      this.belongsTo(models.Cart, {
        foreignKey: "productId",
        as: "cart",
      });
      //categoryId is the foreign key of product
      this.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }
  Products.init(
    {
      productName: DataTypes.STRING,
      productImage: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      isAvailable: DataTypes.BOOLEAN,
      stockLeft: DataTypes.INTEGER,
      productImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
