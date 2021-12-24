const { body, query, param } = require("express-validator");

exports.createProductValidation = (controller = "") => {
  let rules = [];
  switch (controller) {
    case "createProduct": {
      console.log("test", controller);
      rules = [
        body("productName")
          .trim()
          .notEmpty()
          .bail()
          .withMessage("Please enter Product name"),
      ];
      break;
    }
  }
  return rules;
};

//validation for create product by admin
// exports.createProductValidation = [
//   body("productName")
//     .isLength({ min: 3 })
//     .withMessage("productName must be atleast 3 characters long")
//     .bail(),
// body("description")
//   .isLength({ min: 5 })
//   .withMessage("description must be atleast 5 characters long")
//   .bail(),
// body("price").isNumeric().withMessage("price must be a number").bail(),
// body("category")
//   .isLength({ min: 3 })
//   .withMessage("category must be atleast 3 characters long")
//   .bail(),
// body("isAvailable")
//   .isBoolean()
//   .withMessage("isAvailable must be a boolean")
//   .bail(),
// body("stockLeft").isNumeric().withMessage("stockLeft must be a number"),
//];

//validation for update product by admin
exports.updateProductValidation = [
  body("productName")
    .isLength({ min: 3 })
    .withMessage("productName must be atleast 3 characters long")
    .bail(),
  body("description")
    .isLength({ min: 5 })
    .withMessage("description must be atleast 5 characters long")
    .bail(),
  body("price").isNumeric().withMessage("price must be a number").bail(),
  body("category")
    .isLength({ min: 3 })
    .withMessage("category must be atleast 3 characters long")
    .bail(),
  body("isAvailable")
    .isBoolean()
    .withMessage("isAvailable must be a boolean")
    .bail(),
  body("stockLeft").isNumeric().withMessage("stockLeft must be a number"),
];

//validation for delete product by admin
exports.deleteProductValidation = [
  param("productId")
    .isNumeric()
    .withMessage("productId must be a number")
    .bail(),
];

//validation for get all products by admin
exports.getAllProductsValidation = [
  query("page")
    .optional()
    .isInt({ gt: 0, lt: 10 })
    .withMessage("page must be a number between 1 and 10")
    .bail(),
  query("size")
    .optional()
    .isInt({ gt: 0, lt: 10 })
    .withMessage("size must be a number between 1 and 10")
    .bail(),
  query("search")
    .optional()
    .isLength({ min: 3 })
    .withMessage("search must be atleast 3 characters long")
    .bail(),
  query("category")
    .optional()
    .isLength({ min: 3 })
    .withMessage("category must be atleast 3 characters long")
    .bail(),
];
