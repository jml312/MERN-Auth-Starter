import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

import { logoutUser, setCurrentUser } from "features/auth/authSlice";
import PrivateRoute from "components/PrivateRoute";

const Login = lazy(() => import("features/auth/Login"));
const Register = lazy(() => import("features/auth/Register"));
const ForgotPassword = lazy(() => import("features/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("features/auth/ResetPassword"));
const Home = lazy(() => import("components/Home"));

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.token;
    // Check for token to keep user logged in
    if (token) {
      try {
        // Decode token and get user info and exp
        const { username, email, exp } = jwt_decode(token);
        // Set user and isAuthenticated
        dispatch(setCurrentUser({ username, email }));
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (exp < currentTime) {
          // Logout user
          dispatch(logoutUser());
          // Redirect to login
          history.push("/");
        }
      } catch {
        // Logout user
        dispatch(logoutUser());
        // Redirect to login
        history.push("/");
      }
    }
  }, []);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route
          exact
          path="/resetpassword/:resetToken"
          component={ResetPassword}
        />
        <PrivateRoute exact path="/home" component={Home} />
      </Switch>
    </Suspense>
  );
};
export default App;
