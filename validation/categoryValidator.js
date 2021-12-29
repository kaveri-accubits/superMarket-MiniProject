const { body, param } = require("express-validator");

//validation for create category by admin
exports.createCategoryValidation = [
  body("category")
    .isLength({ min: 3 })
    .withMessage("categoryName must be atleast 3 characters long")
    .bail(),
];
exports.idCategoryValidation = [
  param("categoryId")
    .notEmpty()
    .withMessage("categoryId is required")
    .bail()
    .isInt()
    .withMessage("categoryId must be an integer")
    .bail(),
];
