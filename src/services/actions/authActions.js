import {createAsyncThunk} from "@reduxjs/toolkit";
import {SET_AUTH_CHECKED, SET_USER} from "../userSlice.js";
import {api} from "../../utils/api.js";
import { Navigate } from "react-router-dom";

export const getUser = () => {
    return (dispatch) => {
        return api.getUserRequest().then((res) => {
            dispatch(SET_USER(res.user));
        });
    };
};

export const patchUser = (form) => {
    return (dispatch) => {
        return api.patchUserRequest(form).then((res) => {
            if (res.success){
                <Navigate to='/login'/>
                dispatch(SET_USER(res.user));
            }
        });
    };
};

export const login = createAsyncThunk(
    "user/login",
    async (form) => {
        const res = await api.loginRequest(form)
        console.log(res)
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        if (res.success) {
            <Navigate to='/'/>
            return res.user;
        }
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (form) => {
        const res = await api.registerRequest(form)
        console.log(res)
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        if (res.success) {
            <Navigate to='/'/>
            return res.user;
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "user/forgot",
    async (form) => {
        const res = await api.forgotPasswordRequest(form)
        console.log(res)
        if (res.success) {
            <Navigate to='/reset-password'/>
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/reset",
    async (form) => {
        const res = await api.resetPasswordRequest(form)
        if (res.success) {
            <Navigate to='/login'/>
        }
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


export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await api.logoutRequest();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);

export const changeToken = createAsyncThunk(
    "user/token",
    async () => {
        const res = await api.tokenRequest();
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
    }
);

