// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserAPI, loginUserAPI, logoutUserAPI } from "./authAPI";
import { clearCart } from "../cart/cartSlice";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

export const registerUser = createAsyncThunk("auth/register", registerUserAPI);

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  const user = await loginUserAPI(credentials);
  localStorage.setItem('user', JSON.stringify(user));
  thunkAPI.dispatch(clearCart()); // ✅ clear cart on login
  return user;
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  await logoutUserAPI();
  localStorage.removeItem('user');
  thunkAPI.dispatch(clearCart()); // ✅ clear cart on logout
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // to avoid auto-logging after registration
        // state.user = action.payload; 
        // localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
