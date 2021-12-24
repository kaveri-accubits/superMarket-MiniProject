const models = require("../../models/index");

//check whether this productId exists in product table
const productCheck = async (productId) => {
  const product = await models.Product.findOne({
    where: {
      id: productId,
    },
  });
};

module.exports = { productCheck };
