const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");

const models = require("../../models/index");
const { addUnit, removeUnit, unitUpdater, viewUnit } = require("./unitService");

//create unit
async function createUnit(req, res) {
  const { unitName } = req.body;
  const params = {
    unitName: unitName,
  };
  try {
    const data = await addUnit(params);
    return response.success(res, responseMessage.unit.unitCreated, data);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.unit.errorCreatingUnit,
      error
    );
  }
}

//get all units
async function getAllUnits(req, res) {
  try {
    const data = await viewUnit();
    return response.success(res, responseMessage.unit.unitFound, data);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.unit.errorViewingUnit,
      error
    );
  }
}

//update unit
async function updateUnit(req, res) {
  const { unitName } = req.body;
  const params = {
    unitName: unitName,
  };
  try {
    const data = await unitUpdater(params);
    return response.success(res, responseMessage.unit.unitUpdated, data);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.unit.errorUpdatingUnit,
      error
    );
  }
}

//delete unit
async function deleteUnit(req, res) {
  const { unitId } = req.body;
  const params = {
    unitId: unitId,
  };
  try {
    const data = await removeUnit(params);
    return response.success(res, responseMessage.unit.unitDeleted, data);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.unit.errorDeletingUnit,
      error
    );
  }
}

module.exports = {
  createUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
};
