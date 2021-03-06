const { check } = require("express-validator");

const validateLoginInput = () => [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

const validateRegisterInput = () => [
  check("username", "Username is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

module.exports = {
  validateLoginInput,
  validateRegisterInput,
};
