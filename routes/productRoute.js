const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const {
  createProductValidation,
  updateProductValidation,
  deleteProductValidation,
  getAllProductsValidation,
} = require("../validation/productValidator");

const { validate } = require("../validation/validator");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../modules/product/productController");

//create product
router.post(
  "/create",
  adminAuthMiddleware,
  //validate(createProductValidation("createProduct")),
  createProduct
);

//get all products for admin and user
router.get(
  "/getAll",
  authMiddleware,
  validate(getAllProductsValidation),
  getAllProducts
);

//update product
router.put(
  "/update/:productId",
  adminAuthMiddleware,
  updateProductValidation,
  updateProduct
);

//delete product
router.delete(
  "/delete/:productId",
  adminAuthMiddleware,
  validate(deleteProductValidation),
  deleteProduct
);

module.exports = router;
