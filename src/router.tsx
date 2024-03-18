import {createBrowserRouter, Navigate} from "react-router-dom";
import {AuthLayout, MainLayout} from "./layouts";
import {LoginPage, MovieInfoPage, MoviePage} from "./pages";
import React from "react";
import {AuthRequired} from "./hoc";
import {GenresPage} from "./pages/GenresPage";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <Navigate to={'movies'}/>
            },
            {
                element: <AuthRequired><AuthLayout/></AuthRequired>, children: [
                    {
                        path: 'movies', element: <MoviePage/>
                    },
                    {
                        path: '/movieInfo', element: <MovieInfoPage/>
                    },
                    {
                        path: '/genre/:id', element: <GenresPage/>
                    }
                ]
            },
            {
                path: 'login', element: <LoginPage/>
            }
        ]
    }
])

export {
    router
}