import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "../userSlice.js";
import {api} from "../../utils/api.js";

export const getUser = () => {
    return (dispatch) => {
        return api.getUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const login = createAsyncThunk(
    "user/login",
    async () => {
        const res = await api.login();
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await api.logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);
