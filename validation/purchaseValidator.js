const { body, query, validationResult } = require("express-validator");

//validation for create purchase details by admin
exports.createPurchaseDetailsValidation = [
  body("dealerName")
    .not()
    .isEmpty()
    .withMessage("dealerName is required")
    .bail(),
  body("costPrice")
    .not()
    .isEmpty()
    .withMessage("costPrice is required")
    .isNumeric()
    .withMessage("costPrice must be numeric")
    .bail(),
  body("totalPrice")
    .not()
    .isEmpty()
    .withMessage("totalPrice is required")
    .isNumeric()
    .withMessage("totalPrice must be numeric")
    .bail(),
  body("stockPerDeal")
    .not()
    .isEmpty()
    .withMessage("stockPerDeal is required")
    .isNumeric()
    .withMessage("stockPerDeal must be numeric")
    .bail(),
  body("dateOfPurchase")
    .not()
    .isEmpty()
    .withMessage("dateOfPurchase is required")
    .bail(),
  body("productId").not().isEmpty().withMessage("productId is required").bail(),
];
