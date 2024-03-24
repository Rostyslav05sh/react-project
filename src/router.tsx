import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {SearchForm} from "./components";
import {GenresPage, MovieInfoPage, MoviePage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <Navigate to={'movies'}/>
            },
            {
                path: 'movies', element: <MoviePage/>
            },
            {
                path: 'movieInfo', element: <MovieInfoPage/>
            },
            {
                path: 'genre/:id', element: <GenresPage/>
            },
            {
                path: 'search', element: <SearchForm/>

            },
        ]
    }
])

export {
    router
}