const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const { createCartValidation } = require("../validation/cartValidator");
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
router.put("/update/:cartId", authMiddleware, updateCart);

//delete cart
router.delete("/delete/:cartId", authMiddleware, deleteCart);

//view cart
router.get("/view/:cartId", authMiddleware, viewCart);

module.exports = router;
