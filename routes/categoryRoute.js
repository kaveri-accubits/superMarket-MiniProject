const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const {
  createCategoryValidation,
  idCategoryValidation,
} = require("../validation/categoryValidator");
const { validate } = require("../validation/validator");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../modules/category/categoryController");

//create category
router.post(
  "/create",
  adminAuthMiddleware,
  validate(createCategoryValidation),
  createCategory
);

//update category
router.put(
  "/update/:categoryId",
  adminAuthMiddleware,
  validate(createCategoryValidation),
  updateCategory
);

//delete category
router.delete(
  "/delete/:categoryId",
  adminAuthMiddleware,
  validate(idCategoryValidation),
  deleteCategory
);

//get all category
router.get(
  "/view",
  authMiddleware,
  validate(idCategoryValidation),
  getAllCategory
);

module.exports = router;
