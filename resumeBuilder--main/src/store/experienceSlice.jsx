import { createSlice } from "@reduxjs/toolkit";

const setLocalData = (state) => {
    localStorage.setItem('experience', JSON.stringify(state))
}
const localData = JSON.parse(localStorage.getItem('experience')) || []

export const experienceReducer = createSlice({
    name: 'experience',
    initialState: localData,
    reducers: {
        addExperience: (state, action) => {
            const updatedData = [...state, action.payload];
            setLocalData(updatedData)
            return updatedData
        },
        removeExperience: (state, action) => {
            const updatedData = state.filter((state) => state.id !== action.payload);
            setLocalData(updatedData) 
            return updatedData
        }
    }
})

export const { addExperience, removeExperience } = experienceReducer.actions
export default experienceReducer.reducer