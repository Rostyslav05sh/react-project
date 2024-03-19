import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {GenresPage, MovieInfoPage, MoviePage} from "./pages";
import React from "react";
import {SearchForm} from "./components/SearchContainer/SearchForm";

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