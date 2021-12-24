const models = require("../../models/index");

const addProduct = async (params) => {
  console.log("params", params);
  const data = await models.Products.create(params);
  return data;
};

const removeProduct = async (id) => {
  const data = await models.Products.destroy({
    where: {
      id: id,
    },
  });
  return data;
};
module.exports = { addProduct, removeProduct };
