const { body, query, param } = require("express-validator");

// exports.createProductValidation = (controller = "") => {
//   let rules = [];
//   switch (controller) {
//     case "createProduct": {
//       console.log("test", controller);
//       rules = [
//         body("productName")
//
//           .notEmpty()
//           .bail()
//           .withMessage("Please enter Product name"),
//       ];
//       break;
//     }
//   }
//   return rules;
// };

//validation for create product
exports.ProductValidation = [
  body("productName")
    .notEmpty()
    .withMessage("Please enter Product name")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Product name must be atleast 3 characters long")
    .bail(),
  body("description")
    .notEmpty()
    .withMessage("Please enter Product description")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Product description must be atleast 3 characters long")
    .bail(),
  body("categoryId")
    .notEmpty()
    .withMessage("Please enter Product category")
    .bail()
    .isInt()
    .withMessage("Product category must be an integer")
    .bail(),
  body("unitId")
    .notEmpty()
    .withMessage("Please enter Product unit id")
    .bail()
    .isInt()
    .withMessage("Product unit must be an integer")
    .bail(),
  body("price")
    .notEmpty()
    .withMessage("Please enter Product price")
    .bail()
    .isNumeric()
    .withMessage("Product price must be numeric")
    .bail(),
  body("stockLeft")
    .notEmpty()
    .withMessage("Please enter Product stock left")
    .bail()
    .isInt()
    .withMessage("Product stock left must be an integer")
    .bail(),
  body("isAvailable")
    .notEmpty()
    .withMessage("Please enter Product availability")
    .bail()
    .isBoolean()
    .withMessage("Product availability must be boolean")
    .bail(),
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
