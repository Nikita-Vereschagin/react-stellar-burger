import {createSlice} from "@reduxjs/toolkit";
import { login, logout } from "./actions/authActions";

const initialState = {
    user: null,
    isAuthChecked: false,
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
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
        })
        .addCase(login.rejected, (state) => {
          state.user = null
          state.isAuthChecked = false;
        })
        .addCase(logout.rejected, (state) => {
          return state.user
        })
  }
});

export const { SET_USER, SET_AUTH_CHECKED } = userSlice.actions;

export default userSlice;
