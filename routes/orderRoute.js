const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const {
  OrderValidation,
  idOrderValidation,
} = require("../validation/orderValidator");
const { validate } = require("../validation/validator");
const {
  createOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
} = require("../modules/order/orderController");

//create order
router.post(
  "/create",
  authMiddleware,
  validate(OrderValidation),
  createOrderDetails
);

//update order
router.put(
  "/update/:orderId",
  authMiddleware,
  validate(OrderValidation),
  updateOrderDetails
);
//delete order
router.delete(
  "/delete/:orderId",
  authMiddleware,
  validate(idOrderValidation),
  deleteOrderDetails
);

module.exports = router;
