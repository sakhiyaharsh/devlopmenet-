import { createSlice } from '@reduxjs/toolkit'


const setLocalData = (state) => {
    localStorage.setItem("skills", JSON.stringify(state))
}
const localData = JSON.parse(localStorage.getItem('skills'))
export const skillReducer = createSlice({
    name: "skills",
    initialState: localData || [],
    reducers: {

        addSkills: (state, action) => {
            const updatedData = [...state, ...action.payload]
            setLocalData(updatedData)
            return updatedData
        },
        removeSkills: (state, action) => {
            const updatedData = state.filter((skill) => skill !== action.payload)
            setLocalData(updatedData)
            return updatedData
        }
    }
})

export const { addSkills, removeSkills } = skillReducer.actions
export default skillReducer.reducer