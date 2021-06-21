const { Schema, model } = require("mongoose");
const { genSalt, hash, compare } = require("bcryptjs");
const { randomBytes, createHash } = require("crypto");
const { sign } = require("jsonwebtoken");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return sign(
    { username: this.username, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = randomBytes(20).toString("hex");
  // Hash token (private key) and save to database
  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  return resetToken;
};

module.exports = User = model("users", UserSchema);
