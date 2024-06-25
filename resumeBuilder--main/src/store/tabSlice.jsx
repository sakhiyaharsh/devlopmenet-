import { createSlice } from "@reduxjs/toolkit";


export const printedReducer = createSlice({
    name: 'printed',
    initialState: false,
    reducers: {
        setStatus: (state, action) => {
            return action.payload
        },

    }
})

export const { setStatus } = printedReducer.actions
export default printedReducer.reducer