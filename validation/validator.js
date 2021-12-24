const response = require("../utils/responseData");
const responseMessage = require("../utils/responseMessage");
const { validationResult } = require("express-validator");

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return response.unprocessableEntity(
    res,
    responseMessage.error.unprocessableEntity,
    errors.array()
  );
};

module.exports = { validate };
