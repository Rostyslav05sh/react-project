import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/moviesSlice";
import {genreReducer} from "./slices/GenresSlice";

const store = configureStore({
    reducer: {
        movies: movieReducer,
        genres: genreReducer
    }
})

export {
    store
}