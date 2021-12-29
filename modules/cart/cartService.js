const models = require("../../models/index");

//check whether this productId exists in product table
const productCheck = async (productId) => {
  console.log("test", productId);
  const product = await models.Products.findOne({
    where: {
      id: productId,
    },
  });
  console.log("product", product);
  return product;
};

//add cart
const addCart = async (params) => {
  const data = await models.Cart.create(params);
  return data;
};

//update cart
const cartUpdater = async (params) => {
  const data = await models.Cart.update(params, {
    where: {
      id: params.id,
    },
  });
  return data;
};

//remove cart
const removeCart = async (id) => {
  const data = await models.Cart.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

module.exports = { productCheck, addCart, cartUpdater, removeCart };
