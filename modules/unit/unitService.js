const models = require("../../models/index");

//add unit

const addUnit = async (params) => {
  console.log("params", params);
  const data = await models.unit.create(params);
  return data;
};

//remove unit
const removeUnit = async (id) => {
  const data = await models.unit.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

//update unit
const unitUpdater = async (params) => {
  const data = await models.unit.update(params, {
    where: {
      id: params.id,
    },
  });
  return data;
};

//get all unit
const viewUnit = async () => {
  const data = await models.unit.findAll();
  return data;
};

module.exports = { addUnit, removeUnit, unitUpdater, viewUnit };
