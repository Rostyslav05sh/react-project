import {AxiosError} from "axios";
import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IMovie, IMovieRes} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    page: string,
    results: IMovieRes[],
}

const initialState: IState = {
    page: null,
    results: [],
}

const getAll = createAsyncThunk<IMovie, { page: string }>(
    'moviesSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAllMovies(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue("An error occurred");
            }
        }
    }
)

const getMovieById = createAsyncThunk<IMovie, { id: string }>(
    'getMovieById/moviesSlice',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue("An error occurred");
            }
        }
    }
)

export const clearMovies = createAction('movies/clearMovies');

const moviesSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.results = action.payload.results
                state.page = action.payload.moviePage
            })
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.results = action.payload.results
                state.page = action.payload.moviePage
            })
            .addCase(clearMovies, state => {
                state.results = []
            })
    }
})

const {reducer: movieReducer, actions} = moviesSlice;

const movieActions = {
    ...actions,
    getAll,
    getMovieById,
    clearMovies
}

export {
    movieActions,
    movieReducer
}