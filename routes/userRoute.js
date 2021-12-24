const express = require("express");
const router = express.Router();
const {
  signUpValidation,
  userSignInValidation,
} = require("../validation/userValidator");
const { validate } = require("../validation/validator");
const { signUp, signIn } = require("../modules/user/userController");

//sign up
router.post("/signup", validate(signUpValidation), signUp);

//sign in
router.post("/signin", validate(userSignInValidation), signIn);

module.exports = router;
