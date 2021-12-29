const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");

const models = require("../../models/index");
const {
  addPurchase,
  removePurchase,
  purchaseUpdater,
  viewPurchases,
} = require("./purchaseService");

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
  const params = {
    dealerName,
    costPrice,
    totalPrice,
    stockPerDeal,
    dateOfPurchase,
    productId,
  };
  try {
    const purchaseData = await addPurchase(params);
    return response.success(
      res,
      responseMessage.purchase.purchaseCreated,
      purchaseData
    );
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.purchase.errorCreatingPurchase,
      err
    );
  }
}

//update purchase details
async function updatePurchaseDetails(req, res) {
  const { purchaseId } = req.params;
  const {
    dealerName,
    costPrice,
    totalPrice,
    stockPerDeal,
    dateOfPurchase,
    productId,
  } = req.body;
  const params = {
    dealerName,
    costPrice,
    totalPrice,
    stockPerDeal,
    dateOfPurchase,
    productId,
  };
  try {
    const purchaseData = await purchaseUpdater(purchaseId, params);
    return response.success(
      res,
      responseMessage.purchase.purchaseUpdated,
      purchaseData
    );
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.purchase.errorUpdatingPurchase,
      err
    );
  }
}

//delete purchase details
async function deletePurchaseDetails(req, res) {
  const { purchaseId } = req.params;
  try {
    const purchaseData = await removePurchase(purchaseId);
    return response.success(
      res,
      responseMessage.purchase.purchaseDeleted,
      purchaseData
    );
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.purchase.errorDeletingPurchase,
      err
    );
  }
}

//get all purchase details
async function getAllPurchaseDetails(req, res) {
  try {
    const purchaseData = await viewPurchases();
    return response.success(
      res,
      responseMessage.purchase.purchaseRetrieved,
      purchaseData
    );
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.purchase.errorRetrievingPurchase,
      err
    );
  }
}

module.exports = {
  createPurchaseDetails,
  updatePurchaseDetails,
  deletePurchaseDetails,
  getAllPurchaseDetails,
};
