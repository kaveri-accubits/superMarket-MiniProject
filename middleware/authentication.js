const response = require("../utils/responseData");
const responseMessage = require("../utils/responseMessage");
const { JWT } = require("../config/DBconfig");
const { verifyToken } = require("../utils/jwt");
const logger = require("../utils/logger");

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return response.unauthorized(res, responseMessage.error.tokenEmpty, null);
    }

    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    req.decoded = await verifyToken(token);

    //logger.info("token verified", req.decoded);

    next();
  } catch (err) {
    logger.error(err);
    response.internalServerError(res, responseMessage.error.invalidToken, err);
  }
};

//authentication of token for admin by checking role
const adminAuthMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return response.unauthorized(res, responseMessage.error.tokenEmpty, null);
    }
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    req.decoded = await verifyToken(token);
    // console.log("token verified", req.decoded);
    if (req.decoded.role !== "admin") {
      return response.unauthorized(
        res,
        responseMessage.error.notAuthorized,
        null
      );
    }
    next();
  } catch (err) {
    logger.error(err);
    response.internalServerError(res, responseMessage.error.invalidToken);
  }
};

module.exports = { authMiddleware, adminAuthMiddleware };
