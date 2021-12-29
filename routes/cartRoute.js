const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authentication");
const {
  createCartValidation,
  idCartValidation,
} = require("../validation/cartValidator");
const { validate } = require("../validation/validator");
const {
  createCart,
  updateCart,
  deleteCart,
  viewCart,
} = require("../modules/cart/cartController");

//create cart
router.post(
  "/create",
  authMiddleware,
  validate(createCartValidation),
  createCart
);

//update cart
router.put(
  "/update/:cartId",
  authMiddleware,
  validate(createCartValidation),
  updateCart
);

//delete cart
router.delete(
  "/delete/:cartId",
  authMiddleware,
  validate(idCartValidation),
  deleteCart
);

//view cart
router.get(
  "/view/:cartId",
  authMiddleware,
  validate(idCartValidation),
  viewCart
);

module.exports = router;
