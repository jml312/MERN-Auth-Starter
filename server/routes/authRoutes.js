const { Router } = require("express");
const {
  validateLoginInput,
  validateRegisterInput,
} = require("../middleware/authMiddleware.js");
const {
  login,
  googleLogin,
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers.js");

const router = Router();

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", validateLoginInput(), login);

// @route POST api/users/googlelogin
// @desc Find or create Google user and return JWT token
// @access Public
router.post("/googlelogin", googleLogin);

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", validateRegisterInput(), register);

// @route POST api/users/forgotpassword
// @desc Send password reset link to user
// @access Public
router.post("/forgotpassword", forgotPassword);

// @route POST api/users/resetpassword/:resetToken
// @desc Send JWT token to user
// @access Public
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
