import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("personalData"))

const initialState = localData || {users:[]};

const setLocalData = (state) => {
    localStorage.setItem("personalData", JSON.stringify(state))
}

export const mainReducer = createSlice({
    name: 'main',
    initialState,
    reducers: {
        personalData: (state, action) => {
            const { username, email, phone, address } = action.payload;
            state.users = [{ name: username, email, phone, address }];
            setLocalData(state)
        },
        removeData: (state, action) => {
            const newData = action.payload;
            setLocalData(newData);
            return newData;
        }
    }
})

export const { personalData, removeData } = mainReducer.actions
export default mainReducer.reducer 