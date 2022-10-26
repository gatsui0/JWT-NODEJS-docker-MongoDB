import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: localStorage.token
    },
    reducers: {
        incrementToken: (state, action) => {
            state.token = action.payload
          },
    }
})

export const { incrementToken } = tokenSlice.actions;
export default tokenSlice.reducer;
