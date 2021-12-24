const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const {
  createPurchaseDetails,
  updatePurchaseDetails,
} = require("../modules/purchase/purchaseController");
const { validate } = require("../validation/validator");

const {
  createPurchaseDetailsValidation,
} = require("../validation/purchaseValidator");

//create purchase details
router.post(
  "/create",
  adminAuthMiddleware,
  validate(createPurchaseDetailsValidation),
  createPurchaseDetails
);

//update purchase details
router.put("/update/:purchaseId", adminAuthMiddleware, updatePurchaseDetails);

module.exports = router;
