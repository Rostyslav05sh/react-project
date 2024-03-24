import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IGenre, IGenreRes, IMovie, IMovieRes} from "../../interfaces";
import {genreService} from "../../services";

interface IState {
    genres: IGenreRes[]
    genre: IGenreRes
    moviesByGenre: IMovieRes[],
}

const initialState: IState = {
    genres: [],
    genre: null,
    moviesByGenre: [],
};

const getAll = createAsyncThunk<IGenre, void>(
    'getAll/genresSlice',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAllGenres();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const getGenreById = createAsyncThunk<IGenreRes, { id: number }>(
    'getGenreById/genresSlice',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getGenreById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const getMoviesByGenreId = createAsyncThunk<IMovie, { page: string, id: string }>(
    'getMoviesByGenreId/genresSlice',
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getMoviesByGenreId(id, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.genres = action.payload.genres
            })
            .addCase(getGenreById.fulfilled, (state, action) => {
                state.genre = action.payload
            })
            .addCase(getMoviesByGenreId.fulfilled, (state, action) => {
                state.moviesByGenre = action.payload.results
            })
    }
})

const {reducer: genreReducer, actions} = genresSlice;

const genreActions = {
    ...actions,
    getAll,
    getGenreById,
    getMoviesByGenreId
}

export {
    genreActions,
    genreReducer
}