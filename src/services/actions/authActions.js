import { createAsyncThunk } from "@reduxjs/toolkit";
import { SET_AUTH_CHECKED, SET_USER } from "../userSlice.js";
import { api } from "../../utils/api.js";

export const getUser = () => {
  return (dispatch) => {
    return api.getUserRequest().then((res) => {
      dispatch(SET_USER(res.user));
    });
  };
};

export const patchUser = createAsyncThunk(
  "user/patch",
  async (form, thunkAPI) => {
    const res = await api.patchUserRequest(form);
    if (res.success) {
      return res.user;
    }

    return thunkAPI.rejectWithValue("");
  }
);

export const login = createAsyncThunk("user/login", async (form, thunkAPI) => {
  const res = await api.loginRequest(form);
  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  if (res.success) {
    return res.user;
  }

  return thunkAPI.rejectWithValue("");
});

export const register = createAsyncThunk(
  "user/register",
  async (form, thunkAPI) => {
    const res = await api.registerRequest(form);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    if (res.success) {
      return res.user;
    }

    return thunkAPI.rejectWithValue("");
  }
);

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(SET_USER(null));
        })
        .finally(() => dispatch(SET_AUTH_CHECKED(true)));
    } else {
      dispatch(SET_AUTH_CHECKED(true));
    }
  };
};

export const logout = createAsyncThunk("user/logout", async () => {
  await api.logoutRequest();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});
