import request from "./request";

// takes an email and password
const login = (data) => {
  return request({
    url: "/api/auth/login",
    method: "POST",
    data,
  });
};

// takes a username and email
const googleLogin = (data) => {
  return request({
    url: "/api/auth/googlelogin",
    method: "POST",
    data,
  });
};

// takes a username, email, and password
const register = (data) => {
  return request({
    url: "/api/auth/register",
    method: "POST",
    data,
  });
};

// takes an email
const forgotPassword = (data) => {
  return request({
    url: "/api/auth/forgotpassword",
    method: "POST",
    data,
  });
};

// takes a reset token and a new password
const resetPassword = ({ resetToken, password }) => {
  const data = { password };
  return request({
    url: `/api/auth/resetpassword/${resetToken}`,
    method: "PUT",
    data,
  });
};

export default {
  login,
  googleLogin,
  register,
  forgotPassword,
  resetPassword,
};
