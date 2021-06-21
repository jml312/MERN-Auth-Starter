import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import authAPI from "api/authAPI";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const { token } = await authAPI.login(data);
      // Set token to local storage
      localStorage.setItem("token", token);
      // Decode token to get user data
      const { username, email } = jwt_decode(token);
      return { username, email };
    } catch (error) {
      console.log("ERROR: ", error.data);
      return rejectWithValue(error.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googlelogin",
  async (data, { rejectWithValue }) => {
    try {
      const { token } = await authAPI.googleLogin(data);
      // Set token to local storage
      localStorage.setItem("token", token);
      // Decode token to get user data
      const { username, email } = jwt_decode(token);
      return { username, email };
    } catch (error) {
      console.log("ERROR: ", error.data);
      return rejectWithValue(error.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const { token } = await authAPI.register(data);
      // Set token to local storage
      localStorage.setItem("token", token);
      // Decode token to get user data
      const { username, email } = jwt_decode(token);
      return { username, email };
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotpassword",
  async (data, { rejectWithValue }) => {
    try {
      const { isEmailSent } = await authAPI.forgotPassword(data);
      return { isEmailSent };
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (data, { rejectWithValue }) => {
    try {
      const { isPasswordReset } = await authAPI.resetPassword(data);
      return { isPasswordReset };
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

let initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  isLoading: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      // Remove token from local storage
      localStorage.removeItem("token");
      // Set isAuthenticated to false and user to {}
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [googleLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [forgotPassword.pending]: (state, action) => {
      state.isLoading = true;
      state.isEmailSent = false;
    },
    [resetPassword.pending]: (state, action) => {
      state.isLoading = true;
      state.isPasswordReset = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [googleLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isEmailSent = action.payload;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.isPasswordReset = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    [googleLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.isEmailSent = false;
      state.errors = action.payload;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.isPasswordReset = false;
      state.errors = action.payload;
    },
  },
});

export const { setCurrentUser, logoutUser } = auth.actions;

export default auth.reducer;
