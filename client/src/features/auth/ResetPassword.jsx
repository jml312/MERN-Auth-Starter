import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";

import { resetPassword } from "features/auth/authSlice";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { isPasswordReset, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const { resetToken } = useParams();

  // If logged in and user navigates to Login page, should redirect them to home
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
    }
  }, [isAuthenticated]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setPasswordError("");
      }, 5000);
      return setPasswordError("Passwords do not match");
    }
    dispatch(resetPassword({ resetToken, password }));
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h3>Forgot Password</h3>
        <Link to="/">Back to login</Link>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <span>{passwordError}</span>
        <span>
          {isPasswordReset ? (
            <p>Password reset successfully. Please login.</p>
          ) : (
            ""
          )}
        </span>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
