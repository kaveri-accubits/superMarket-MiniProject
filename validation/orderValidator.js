const { body, param } = require("express-validator");
exports.OrderValidation = [
  body("totalQuantity")
    //must be between 1 and 20
    .notEmpty()
    .withMessage("Total Quantity is required")
    .bail()
    .isInt({ min: 1, max: 20 })
    .withMessage("Total quantity must be between 1 and 20")
    .bail(),
  body("totalPrice")
    .notEmpty()
    .withMessage("Total price is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("totalPrice must be atleast 1")
    .bail(),
  body("paymentStatus")
    //is either complete or pending
    .notEmpty()
    .withMessage("Payment status is required")
    .bail()
    .isIn(["complete", "pending"])
    .withMessage("paymentStatus must be either complete or pending")
    .bail(),
];

exports.idOrderValidation = [
  param("orderId")
    .notEmpty()
    .withMessage("Order Id is required")
    .bail()
    .isInt()
    .withMessage("Order Id must be an integer")
    .bail(),
];
