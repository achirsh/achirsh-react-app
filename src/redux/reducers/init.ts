import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    client: {
        height: 1,
        width: 2,
    },
};

export const InitSlice = createSlice({
    name: "init",
    initialState,
    reducers: {
        updateClient: (state, action) => {
            state.client = action.payload;
        },
    },
});

export const { updateClient } = InitSlice.actions;

export default InitSlice.reducer;
