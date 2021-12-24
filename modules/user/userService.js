const models = require("../../models/index");

const userExists = async (email) => {
  return models.User.findOne({ where: { email: email } });
};

const passwordExists = async (result) => {
  return models.User.findOne({ where: { id: result.id } });
};

const passwordUpdate = async (password) => {
  return models.User.update(
    { password: password },
    { where: { id: result.id } }
  );
};
const emailExists = async (emailId) => {
  return models.User.count({ where: { email: emailId } });
};

const phoneNumberExists = async (phoneNumber) => {
  return models.User.count({ where: { phone_number: phoneNumber } });
};

module.exports = {
  emailExists,
  phoneNumberExists,
  userExists,
  passwordExists,
  passwordUpdate,
};
