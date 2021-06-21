import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

import { login, googleLogin } from "features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isAuthenticated } = useSelector((state) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  // If logged in and user navigates to Login page, should redirect them to home
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
    }
  }, [isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const onGoogleSuccess = (res) => {
    const email = res.profileObj.email;
    const username = email.split("@")[0];
    dispatch(googleLogin({ username, email }));
  };

  const onGoogleFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Login Below</h3>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">
            Password: <Link to="/forgotpassword">Forgot Password?</Link>
          </label>
          <input
            type="password"
            required
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>{errors?.auth && errors.auth}</div>
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
        <div>
          <h5>or</h5>
        </div>
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy="single_host_origin"
            buttonText="Login With Google"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
