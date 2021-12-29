const { body, param } = require("express-validator");

//validation for create cart
exports.createCartValidation = [
  body("productId").not().isEmpty().withMessage("productId is required").bail(),
  body("quantity")
    .not()
    .isEmpty()
    .withMessage("quantity is required")
    .isNumeric()
    .withMessage("quantity must be numeric")
    .bail(),
];

exports.idCartValidation = [
  param("cartId")
    .notEmpty()
    .withMessage("cartId is required")
    .bail()
    .isInt()
    .withMessage("cartId must be an integer")
    .bail(),
];
