import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from "js-cookie";

import { REQUEST_ACTIONS } from "@consts/actionTypes"
import { login } from "./requests";

import avatarImg from "../../../assets/images/memoji/memoji-1.png";

// Define a name for slice
const sliceName = "auth";

// Define the initial state using that type
const initialState = {
    errors: [],
    loaderState: REQUEST_ACTIONS.REQUEST_IDLE,
    authUser: JSON.parse(localStorage.getItem("user")) || { profile_url: avatarImg },
}

export const signinUser = createAsyncThunk(
    `${sliceName}/signinUser`,
    async (auth, thunkApi) => {
        const res = await login(auth);

        if (res.code === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            Cookies.set("token", res.data.access_token); // Set this to cookies
            return res.data;
        } else {
            let errors = [];
            errors['email'] = res.msg
            return thunkApi.rejectWithValue(errors);
        }
    }
);

export const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.clear();
            Cookies.remove("token");
            Cookies.remove("refreshtoken");

            return {
                ...initialState,
                authUser: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signinUser.pending, (state, action) => {
            localStorage.removeItem("user");
            Cookies.remove("token");
            return {
                ...initialState,
                loaderState: REQUEST_ACTIONS.REQUEST_LOADING,
            };
        });
        builder.addCase(signinUser.fulfilled, (state, action) => {
            return {
                ...initialState,
                loaderState: REQUEST_ACTIONS.REQUEST_SUCCESS,
                errors: [],
                authUser: action.payload.user
            };
        });
        builder.addCase(signinUser.rejected, (state, action) => {
            return {
                ...initialState,
                loaderState: REQUEST_ACTIONS.REQUEST_ERROR,
                errors: action.payload
            };
        });
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
