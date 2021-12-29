const { body, param } = require("express-validator");
//validation for create unit details
exports.UnitDetailsValidation = [
  body("unitName").not().isEmpty().withMessage("unitName is required").bail(),
];
exports.idUnitDetailsValidation = [
  param("unitId")
    .notEmpty()
    .withMessage("unitId is required")
    .bail()
    .isInt()
    .withMessage("unitId must be an integer"),
];
