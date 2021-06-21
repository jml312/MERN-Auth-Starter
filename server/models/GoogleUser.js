const { Schema, model } = require("mongoose");
const { sign } = require("jsonwebtoken");

const GoogleUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

GoogleUserSchema.methods.getSignedJwtToken = function () {
  return sign(
    { username: this.username, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

module.exports = GoogleUser = model("googleUsers", GoogleUserSchema);
