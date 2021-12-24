const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const redis = require("redis");
const { REDIS } = require("../../config/DBconfig");
const models = require("../../models/index");
const { bcryptPassword, comparePassword } = require("../../utils/bcrypt");
const { generateToken, verifyToken } = require("../../utils/jwt");
const {
  emailExists,
  phoneNumberExists,
  userExists,
  passwordExists,
  passwordUpdate,
} = require("./userService");

//redis
// const client = redis.createClient({
//   host: REDIS.REDIS_HOST,
//   port: REDIS.REDIS_PORT,
// });
// client.on("error", function (error) {
//   logger.error("Error " + error);
// });

async function signUp(req, res) {
  const { username, email, password, phoneNumber, address, role } = req.body;
  const hashedPassword = await bcryptPassword(password);
  try {
    if (await userExists(email)) {
      return response.internalServerError(
        res,
        responseMessage.error.userExists,
        null
      );
    }

    const newUser = await models.User.create({
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      password: hashedPassword,
      role: role,
    });
    //console.log(newUser);
    return response.success(res, responseMessage.user.registered, newUser);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.error.errorRegistering,
      user
    );
  }
}

//sign In of user
async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userExists(email);
    if (!user) {
      return response.internalServerError(
        res,
        responseMessage.error.userNotFound,
        null
      );
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return response.internalServerError(
        res,
        responseMessage.error.passwordNotMatch,
        null
      );
    }
    const accessToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "refresh"
    );
    // client.set(
    //   `${refreshToken}`,
    //   JSON.stringify({
    //     refreshToken: refreshToken,
    //     user_id: user._id,
    //   })
    //   //JWT.REFRESH_TOKEN.REFRESH_EXPIRY
    // );
    const token = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return response.success(res, responseMessage.user.loggedIn, token);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.error.errorLoggingIn,
      error
    );
  }
}

module.exports = {
  signUp,
  signIn,
};
