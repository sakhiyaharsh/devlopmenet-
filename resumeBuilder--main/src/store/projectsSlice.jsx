import { createSlice } from "@reduxjs/toolkit";

const setLocalData = (state)=>{
    localStorage.setItem("projects",JSON.stringify(state))
}
const localData = JSON.parse(localStorage.getItem('projects'))

export const projectReducer = createSlice({
    name:"project",
    initialState:localData || [],
    reducers:{
        addProject :(state,action)=>{
            const updatedData = [...state,action.payload]
            setLocalData(updatedData)
            return updatedData
        },
        removeProject : (state,action)=>{
            const updatedData = state.filter((state) => state.id !== action.payload)
            setLocalData(updatedData)
            return updatedData
        }
    }
})

export const {addProject,removeProject} = projectReducer.actions
export default projectReducer.reducer