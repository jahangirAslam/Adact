import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from "js-cookie";

import { login } from "./requests";

// this is temp
import avatarImg from "../../../assets/images/memoji/memoji-1.png";

// Define a name for slice
const sliceName = "auth";

// Define the initial state using that type
const initialState = {
    errors: [],
    otpRequired: false,
    loaderState: false,
    authUser: JSON.parse(localStorage.getItem("user")) || { profile_url: avatarImg },
}

export const signinUser = createAsyncThunk(
    `${sliceName}/signinUser`,
    async(auth, thunkApi) => {
        const res = await login(auth);
        if (res.code === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            Cookies.set("token", res.data.access_token); // Set this to cookies
            Cookies.set("userId", res.data.user.id); // Set this to cookies
            return res.data;
        } else if (res.code === 202) {
            let data = [];
            data.code = 202;
            data.msg = res.msg;
            return thunkApi.rejectWithValue(data);
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
                otpRequired: state.otpRequired,
            };
        });
        builder.addCase(signinUser.fulfilled, (state, action) => {
            return {
                ...initialState,
                loaderState: true,
                authUser: action.payload.user
            };
        });
        builder.addCase(signinUser.rejected, (state, action) => {
            if (action.payload && action.payload.code && action.payload.code === 202) {
                return {
                    ...initialState,
                    otpRequired: true,
                    errors: action.payload.msg
                };
            }
            return {
                ...initialState,
                otpRequired: state.otpRequired,
                errors: action.payload
            };
        });
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;