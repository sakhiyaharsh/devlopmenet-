import { createSlice } from "@reduxjs/toolkit";

const setLocalData = (state) => {
    localStorage.setItem("education", JSON.stringify(state))
}
const localData = JSON.parse(localStorage.getItem('education')) || []

const initialState = localData;

export const educationSlice = createSlice({
    name: 'education',
    initialState,
    reducers: {
        educationDataStore: (state, action) => {
            const updatedData = [...state, action.payload]
            setLocalData(updatedData)
            return updatedData;
        },
        educationDataRemove: (state, action) => {
            const idToRemove = action.payload;
            const updatedData = state.filter((entry) => entry.id !== idToRemove)
            setLocalData(updatedData)
            return updatedData;
        },
        
    }

})

export const { educationDataStore, educationDataRemove } = educationSlice.actions
export default educationSlice.reducer