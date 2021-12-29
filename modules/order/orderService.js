const models = require("../../models/index");

//add order
const addOrder = async (params) => {
  const data = await models.Orders.create(params);
  return data;
};

//remove order
const removeOrder = async (id) => {
  const data = await models.Orders.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

//update order
const updateOrder = async (params) => {
  const data = await models.Orders.update(params, {
    where: {
      id: params.id,
    },
  });
  return data;
};

//get all orders
const getAllOrders = async () => {
  const data = await models.Orders.findAll();
  return data;
};

module.exports = {
  addOrder,
  removeOrder,
  updateOrder,
  getAllOrders,
};
