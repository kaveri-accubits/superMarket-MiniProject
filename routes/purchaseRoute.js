const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const {
  createPurchaseDetails,
  updatePurchaseDetails,
  deletePurchaseDetails,
  getAllPurchaseDetails,
} = require("../modules/purchase/purchaseController");
const { validate } = require("../validation/validator");

const {
  createPurchaseDetailsValidation,
  idPurchaseDetailsValidation,
} = require("../validation/purchaseValidator");

//create purchase details
router.post(
  "/create",
  adminAuthMiddleware,
  validate(createPurchaseDetailsValidation),
  createPurchaseDetails
);

//update purchase details
router.put(
  "/update/:purchaseId",
  adminAuthMiddleware,
  validate(idPurchaseDetailsValidation),
  updatePurchaseDetails
);

//delete purchase details
router.delete(
  "/delete/:purchaseId",
  adminAuthMiddleware,
  validate(idPurchaseDetailsValidation),
  deletePurchaseDetails
);

//get all purchase details
router.get(
  "/view",
  authMiddleware,
  validate(idPurchaseDetailsValidation),
  getAllPurchaseDetails
);

module.exports = router;
