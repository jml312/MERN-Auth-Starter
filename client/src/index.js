import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dotenv from "dotenv";

import App from "./App";
import authReducer from "features/auth/authSlice";
import "./index.css";

dotenv.config();

// combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// create the store
const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
