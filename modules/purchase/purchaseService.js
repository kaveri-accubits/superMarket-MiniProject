const models = require("../../models/index");

//add purchase
const addPurchase = async (params) => {
  const data = await models.Purchase.create(params);
  return data;
};

//remove purchase
const removePurchase = async (id) => {
  const data = await models.Purchase.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

//update purchase
const purchaseUpdater = async (params) => {
  const data = await models.Purchase.update(params, {
    where: {
      id: params.id,
    },
  });
  return data;
};

//get all purchases
const viewPurchases = async () => {
  const data = await models.Purchase.findAll();
  return data;
};

module.exports = {
  addPurchase,
  removePurchase,
  purchaseUpdater,
  viewPurchases,
};
