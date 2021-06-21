import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { forgotPassword } from "features/auth/authSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { isEmailSent, isAuthenticated } = useSelector((state) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  // If logged in and user navigates to Login page, should redirect them to home
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
    }
  }, [isAuthenticated]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h3>Forgot Password</h3>
        <Link to="/">Back to login</Link>
        <div>
          <p>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {isEmailSent ? <p>Password reset sent. Check you inbox.</p> : ""}
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
