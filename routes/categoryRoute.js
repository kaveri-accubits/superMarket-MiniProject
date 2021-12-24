const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const { createCategoryValidation } = require("../validation/categoryValidator");
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
//get all category
router.get("/getAll", authMiddleware, getAllCategory);

//update category
router.put(
  "/update/:categoryId",
  adminAuthMiddleware,
  validate(createCategoryValidation),
  updateCategory
);

//delete category
router.delete("/delete/:categoryId", adminAuthMiddleware, deleteCategory);

module.exports = router;
