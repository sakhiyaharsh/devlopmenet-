import { createSlice } from "@reduxjs/toolkit";

const setLocalData = (state) => {
    localStorage.setItem("summary", JSON.stringify(state))
}
const localData = JSON.parse(localStorage.getItem("summary")) || ""

export const summaryReducer = createSlice({
    name: 'summary',
    initialState: localData,
    reducers: {
        addSummary: (state, action) => {
            setLocalData(action.payload)
            return action.payload
        },
        removeSummary: (state, action) => {
            setLocalData(action.payload)
            return action.payload   
        }
    }
})

export const { addSummary, removeSummary } = summaryReducer.actions
export default summaryReducer.reducer