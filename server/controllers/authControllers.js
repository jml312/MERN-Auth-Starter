const { createHash } = require("crypto");
const { validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");

const User = require("../models/User.js");
const GoogleUser = require("../models/GoogleUser.js");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendToken = async (res, statusCode, user) => {
  const token = await user.getSignedJwtToken();
  res.status(statusCode).json({
    token: `Bearer ${token}`,
  });
};

const login = async (req, res) => {
  // Check Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Formatting errors to return object instead of an array
    const formattedErrors = errors.array().reduce((acc, current) => {
      acc[current["param"]] = current.msg;
      return acc;
    }, {});
    return res.status(400).json(formattedErrors);
  }
  const { email, password } = req.body;
  // Find user by email
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ auth: "Invalid Credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ auth: "Invalid Credentials" });
    }
    sendToken(res, 200, user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const googleLogin = async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = await GoogleUser.findOne({ email });
    if (!user) {
      user = await GoogleUser.create({ username, email });
    }
    sendToken(res, 200, user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const register = async (req, res) => {
  // Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Formatting errors to return object instead of an array
    const formattedErrors = errors.array().reduce((acc, current) => {
      acc[current["param"]] = current.msg;
      return acc;
    }, {});
    return res.status(400).json(formattedErrors);
  }
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ email: "User already exists" });
    }
    user = await User.create({
      username,
      email,
      password,
    });
    sendToken(res, 201, user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const forgotPassword = async (req, res) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ auth: "A user with that email could not be found" });
    }
    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `${process.env.ORIGIN_URL}/resetpassword/${resetToken}`;

    // Text Message
    const text = `
    You have requested a password reset
    Please go to the following link to change your password:
    ${resetUrl}
    `;

    // HTML Message
    const html = `
      <h1>You have requested a password reset</h1>
      <p>Please go to the following link to change your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      await sgMail.send({
        to: user.email,
        from: process.env.EMAIL_FROM,
        subject: "Password Reset Request",
        text,
        html,
      });
      res.status(200).json({ isEmailSent: true });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      console.log(err.message);
      return res.status(500).json({ isEmailSent: false });
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send({ isEmailSent: false });
  }
};

const resetPassword = async (req, res) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Unable to find a user with the provided token." });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({ isPasswordReset: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ isPasswordReset: false });
  }
};

module.exports = {
  login,
  googleLogin,
  register,
  forgotPassword,
  resetPassword,
};
