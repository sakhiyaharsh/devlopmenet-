import { createSlice } from "@reduxjs/toolkit";

const setLocalData = (state) => {
    localStorage.setItem('additional', JSON.stringify(state))
}
const localData = JSON.parse(localStorage.getItem('additional')) || []

const additionalDataReducer = createSlice({
    name: 'additionalData',
    initialState: localData,
    reducers: {
        addAdditionalData: (state, action) => {
            const updatedData = [action.payload]
            setLocalData(updatedData)
            return updatedData
        },
        removeAdditionalData: (state, action) => {
            const updatedData = state.filter((state) => state.id !== action.payload)
            setLocalData(updatedData)
            return updatedData
        }
    }
})

export const { addAdditionalData, removeAdditionalData } = additionalDataReducer.actions
export default additionalDataReducer.reducer