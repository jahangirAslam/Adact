import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { get } from "@utils/axios";


// Define a name for slice
const sliceName = "common";

// Define the initial state using that type
const initialState = {
    permissions: JSON.parse(localStorage.getItem("moduleList")),
}

export const getPermissions = createAsyncThunk(
    `${sliceName}/getPermissions`,
    async (auth, thunkApi) => {
        let exists = localStorage.getItem("moduleList");
        if (exists) {
            return;
        }
        const res = await get("user-management/permission-list");

        if (res.code !== 200) {
            return;
        }

        if (res.data && res.data.length) {
            localStorage.setItem("moduleList", JSON.stringify(res.data));
        }

    }
);

export const commonSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        clearPermissions: (state, action) => {
            localStorage.removeItem("moduleList");

            return {
                ...initialState,
                permissions: [],
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPermissions.pending, (state, action) => {
            localStorage.removeItem("moduleList");

            return {
                ...initialState,
                permissions: [],
            };
        });
        builder.addCase(getPermissions.fulfilled, (state, action) => {
            return {
                ...initialState,
            };
        });
    }
});

export default commonSlice.reducer;
export const { clearPermissions } = commonSlice.actions;
