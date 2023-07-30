import { createSlice } from "@reduxjs/toolkit";
import { login, logout, patchUser } from "./actions/authActions";

const initialState = {
  user: null,
  loading: false,
  isAuthChecked: false,
  hasError: false,
};

export const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    SET_AUTH_CHECKED: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    SET_USER: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.hasError = false;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.hasError = true;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.hasError = false;
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(patchUser.pending, (state) => {
        state.hasError = false;
        state.loading = true;
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(patchUser.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { SET_USER, SET_AUTH_CHECKED } = userSlice.actions;

export default userSlice;
