const { body, query } = require("express-validator");

//for sign up validation of user
exports.signUpValidation = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters")
    .bail(),
  body("email").isEmail().isLength({ min: 7 }).withMessage("Email is required"),
  body("phoneNumber")
    .isLength({ min: 10 })
    .withMessage("Phone number is required")
    .bail(),
  body("address").not().isEmpty().withMessage("Address is required").bail(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .bail(),
  body("role").not().isEmpty().withMessage("Role is required"),
];

//for sign in validation of user
exports.userSignInValidation = [
  body("email")
    .isEmail()
    .isLength({ min: 7 })
    .withMessage("Email is required")
    .bail(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
