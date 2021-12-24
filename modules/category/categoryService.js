const models = require("../../models/index");

const addCategory = async (params) => {
  console.log("params", params);
  const data = await models.Categories.create(params);
  return data;
};

const removeCategory = async (id) => {
  const data = await models.Categories.destroy({
    where: {
      id: id,
    },
  });
  return data;
};

module.exports = { addCategory, removeCategory };
