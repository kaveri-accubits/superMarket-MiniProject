const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");

const models = require("../../models/index");

//create purchase details
async function createPurchaseDetails(req, res) {
  const {
    dealerName,
    costPrice,
    totalPrice,
    stockPerDeal,
    dateOfPurchase,
    productId,
  } = req.body;
  try {
    const purchaseDetails = await models.PurchaseDetails.create({
      dealerName: dealerName,
      costPrice: costPrice,
      totalPrice: totalPrice,
      stockPerDeal: stockPerDeal,
      dateOfPurchase: dateOfPurchase,
      productId: productId,
    });
    return response.success(
      res,
      responseMessage.purchase.purchaseDetailsCreated,
      purchaseDetails
    );
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.error.errorCreatingPurchaseDetails,
      error
    );
  }
}

//update purchase details
async function updatePurchaseDetails(req, res) {
  const {
    dealerName,
    costPrice,
    totalPrice,
    stockPerDeal,
    dateOfPurchase,
    productId,
  } = req.body;
  try {
    const purchaseDetails = await models.PurchaseDetails.update(
      {
        dealerName: dealerName,
        costPrice: costPrice,
        totalPrice: totalPrice,
        stockPerDeal: stockPerDeal,
        dateOfPurchase: dateOfPurchase,
        productId: productId,
      },
      {
        where: {
          id: req.params.purchaseId,
        },
      }
    );
    return response.success(
      res,
      responseMessage.purchase.purchaseDetailsUpdated,
      purchaseDetails
    );
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.error.errorUpdatingPurchaseDetails,
      error
    );
  }
}

module.exports = {
  createPurchaseDetails,
  updatePurchaseDetails,
};
