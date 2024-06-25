import { createSlice } from "@reduxjs/toolkit";


export const tabCounter = createSlice({
    name: 'tabCounter',
    initialState: 0,
    reducers: {
        setTabCounter: (state, action) => {
            return action.payload
        },

    }
})

export const { setTabCounter } = tabCounter.actions
export default tabCounter.reducer