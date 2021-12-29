const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");

const models = require("../../models/index");
const {
  addSales,
  removeSales,
  salesUpdater,
  viewSales,
} = require("./salesService");

//create sales
const createSales = async (req, res) => {
  try {
    const { productId, paymentMethod, purchaseDate } = req.body;
    const userId = req.decoded.userId;
    const params = {
      productId: productId,
      paymentMethod: paymentMethod,
      purchaseDate: purchaseDate,
    };
    //check if productId and userId is valid
    const product = await models.Products.findOne({
      where: { id: productId },
    });
    const user = await models.Users.findOne({
      where: { id: userId },
    });
    if (product && user) {
      const data = await addSales(params);
      return response.success(res, responseMessage.sales.salesCreated, data);
    } else {
      return response.badRequest(res, responseMessage.sales.salesNotFound);
    }
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.sales.errorCreatingSales,
      error
    );
  }
};

//update sales
const updateSales = async (req, res) => {
  try {
    const { productId, paymentMethod, purchaseDate } = req.body;
    const userId = req.decoded.userId;
    const params = {
      userId: userId,
      productId: productId,
      paymentMethod: paymentMethod,
      purchaseDate: purchaseDate,
    };
    //check if productId and userId is valid
    const product = await models.Products.findOne({
      where: { id: productId },
    });
    const user = await models.Users.findOne({
      where: { id: userId },
    });
    if (product && user) {
      const data = await salesUpdater(params);
      return response.success(res, responseMessage.sales.salesUpdated, data);
    } else {
      return response.badRequest(res, responseMessage.sales.salesNotFound);
    }
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.sales.errorUpdatingSales,
      error
    );
  }
};

//delete sales
const deleteSales = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await removeSales(id);
    return response.success(res, responseMessage.sales.salesDeleted, data);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.sales.errorDeletingSales,
      error
    );
  }
};

//get all sales
const getAllSales = async (req, res) => {
  try {
    const data = await viewSales();
    return response.success(res, responseMessage.sales.salesFound, data);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.sales.errorViewingSales,
      error
    );
  }
};

module.exports = {
  createSales,
  updateSales,
  deleteSales,
  getAllSales,
};
