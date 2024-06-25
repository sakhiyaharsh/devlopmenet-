import {createSlice} from '@reduxjs/toolkit'

const setLocalData = (state)=>{
    localStorage.setItem('interest',JSON.stringify(state))
}
const localData = JSON.parse(localStorage.getItem('interest'))

const interestReducer = createSlice({

    name:"interest",
    initialState:localData || [],
    reducers:{
        addInterests:(state,action)=>{
            const updatedData = [...state,action.payload]
            setLocalData(updatedData)
            return  updatedData
        },
        removeInterest:(state,action)=>{
            const updatedData = state.filter((state)=>state !== action.payload)
            setLocalData(updatedData)
            return updatedData
        }
    }
})

export const {addInterests,removeInterest} = interestReducer.actions
export default interestReducer.reducer