import {configureStore} from "@reduxjs/toolkit";

import {darkModeReducer, genreReducer, genresActiveReducer, movieReducer, searchReducer} from "./slices";

const store = configureStore({
    reducer: {
        movies: movieReducer,
        genres: genreReducer,
        search: searchReducer,
        darkMode: darkModeReducer,
        genresActive: genresActiveReducer
    }
})

export {
    store
}