const { body } = require("express-validator");

//validation for create category by admin
exports.createCategoryValidation = [
  body("category")
    .isLength({ min: 3 })
    .withMessage("categoryName must be atleast 3 characters long")
    .bail(),
];
