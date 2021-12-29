const { body, param } = require("express-validator");

exports.salesValidation = [
  body("productId")
    .notEmpty()
    .withMessage("Product Id is required")
    .bail()
    .isInt()
    .withMessage("Product Id must be an integer")
    .bail(),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .bail()
    .isIn(["cash", "credit", "debit", "upi"])
    .withMessage("Payment method must be either cash, credit, debit or upi")
    .bail(),
  // body("purchaseDate")
  //   .notEmpty()
  //   .withMessage("Purchase date is required")
  //   .bail()
  //   //date format must be dd-mm-yyyy
  //   .isISO8601()
  //   .withMessage("Purchase date must be in dd-mm-yyyy format")
  //   .bail(),
];

exports.idSalesValidation = [
  param("salesId")
    .notEmpty()
    .withMessage("Sales Id is required")
    .bail()
    .isInt()
    .withMessage("Sales Id must be an integer")
    .bail(),
];
