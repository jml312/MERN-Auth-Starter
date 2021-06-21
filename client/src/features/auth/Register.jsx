import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const errors = useSelector((state) => state.auth.errors);

  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // If logged in and user navigates to Register page, should redirect them to dashboard
  useEffect(() => {
    if (isAuthenticated) history.push("/home");
  }, [isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setPasswordError("");
      }, 5000);
      return setPasswordError("Passwords do not match");
    }
    dispatch(register({ username, email, password }));
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h4>
              <b>Register</b> below
            </h4>
            <p>
              Already have an account? <Link to="/">Log in</Link>
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                error={errors.name}
                type="text"
                required
              />
              <label htmlFor="name">Username</label>
              <span>{errors.name}</span>
            </div>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={errors.email}
                type="email"
                required
              />
              <label htmlFor="email">Email</label>
              <span>{errors.email}</span>
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={errors.password}
                type="password"
                required
              />
              <label htmlFor="password">Password</label>
              <span>{errors.password}</span>
            </div>
            <div>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                error={passwordError}
                type="password"
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span>{passwordError}</span>
            </div>
            <div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? <span>Loading...</span> : <span>Sign Up</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
