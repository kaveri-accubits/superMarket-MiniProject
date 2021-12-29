const models = require("../../models/index");

//add sales
const addSales = async (params) => {
  console.log("params", params);
  const data = await models.Sales.create(params);
  return data;
};

//remove sales
const removeSales = async (id) => {
  const data = await models.Sales.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

//update sales
const salesUpdater = async (params) => {
  const data = await models.Sales.update(params, {
    where: {
      id: params.id,
    },
  });
  return data;
};

//get all sales
const viewSales = async () => {
  const data = await models.Sales.findAll();
  return data;
};

module.exports = { addSales, removeSales, salesUpdater, viewSales };
