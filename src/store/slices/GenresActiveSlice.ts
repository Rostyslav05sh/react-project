import {createSlice} from "@reduxjs/toolkit";

interface IState {
    genresActive: boolean
}

const initialState = {
    genresActive: false
};
const genresActiveSlice = createSlice({
    name: 'genresActiveSlice',
    initialState,
    reducers: {
        setActive : (state) => {
            state.genresActive = !state.genresActive
        }
    }
})

const {reducer: genresActiveReducer, actions} = genresActiveSlice;

const genresActiveActions = {
    ...actions
};

export {
    genresActiveActions,
    genresActiveReducer
}