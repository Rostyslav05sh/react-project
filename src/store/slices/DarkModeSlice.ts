import {createSlice} from "@reduxjs/toolkit";

interface IState {
    darkMode: boolean
}

const initialState:IState ={
    darkMode: localStorage.getItem("darkMode") === 'true'
};
const darkModeSlice = createSlice({
    name: 'darkModeSlice',
    initialState,
    reducers: {
        toggleDarkMode : (state) => {
            state.darkMode = !state.darkMode
            localStorage.setItem("darkMode", state.darkMode.toString());
        }
    }
})

const {reducer: darkModeReducer, actions} = darkModeSlice;

const darkModeActions = {
    ...actions
}

export {
    darkModeActions,
    darkModeReducer
}