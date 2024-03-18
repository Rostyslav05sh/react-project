import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IMovie, IMovieRes} from "../../interfaces";
import {movieService} from "../../services";
import {urls} from "../../constants";

interface IState {
    page: string,
    results: IMovieRes[]
}

const initialState: IState = {
    page: '1',
    results: []
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
            const {data} = await movieService.getMovieById(urls.movies.movieById(id));
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
    }
})

const {reducer: movieReducer, actions} = moviesSlice;

const movieActions = {
    ...actions,
    getAll,
    getMovieById
}

export {
    movieActions,
    movieReducer
}