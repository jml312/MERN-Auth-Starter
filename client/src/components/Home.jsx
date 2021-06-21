import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "features/auth/authSlice";

const Home = () => {
  // Get user from state
  const { username, email } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1>Hello {username}</h1>
      <h1>Your email is {email}</h1>
      <h1>
        You are successfully logged in{" "}
        <span role="img" aria-label="Rocket Emoji">
          🚀
        </span>
      </h1>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

export default Home;
