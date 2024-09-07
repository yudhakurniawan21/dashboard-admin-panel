// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store/store";
import axios from "axios";

interface User {
  email: string;
  sub: number;
  role: "user" | "admin";
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const defaultExpiryTime = 3600 * 1000; // 1 hour in milliseconds

const getTokenExpiry = (): Date | null => {
  const expiry = localStorage.getItem("tokenExpiry");
  return expiry ? new Date(expiry) : null;
};

const setTokenExpiry = (expiryDate: Date) => {
  localStorage.setItem("tokenExpiry", expiryDate.toISOString());
};

// Compute isAuthenticated based on the token and expiry time
const computeIsAuthenticated = (): boolean => {
  const token = localStorage.getItem("accessToken");
  const expiry = getTokenExpiry();
  console.log(new Date());
  console.log(expiry);
  
  if (token && expiry) {
    return new Date() < expiry;
  }
  return false;
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: computeIsAuthenticated(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
      setTokenExpiry(new Date(Date.now() + defaultExpiryTime)); // Set default expiry
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");
    },
    setAuth(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setAuth } =
  authSlice.actions;

export const login =
  (credentials: { email: string; password: string }): AppThunk =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      dispatch(
        loginSuccess({ user: data.user, accessToken: data.access_token })
      );
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginFailure("Login failed. Please check your credentials."));
    }
  };

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
