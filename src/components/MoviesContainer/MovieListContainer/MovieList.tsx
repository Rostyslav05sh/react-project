import React, {useEffect} from "react";

import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import Badge from "@mui/material/Badge";

import {useAppDispatch, useAppSelector, usePageQuery} from "../../../hooks";
import {MovieListCard} from "../MovieListCardContainer";
import {movieActions} from "../../../store";
import css from './MovieList.module.css'

const MoviesList = () => {

    const {results} = useAppSelector(state => state.movies);
    const {darkMode} = useAppSelector(state => state.darkMode);
    const dispatch = useAppDispatch();
    const {page, prev, next} = usePageQuery();

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
    }, [page, dispatch]);

    return (
        <div>
            <div className={darkMode ? css.MovieList : css.MovieListDark}>
                {results && results.map(movie => <MovieListCard key={movie.id} movie={movie}/>)}
            </div>
            <div className={css.MovieListButtons}>
                <Button className={!darkMode && css.Button} sx={{
                    width: '7vw',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: darkMode ? 'primary' : 'white',
                    bgcolor: darkMode ? 'primary' : '#0000b0'
                }} variant="contained" onClick={prev} disabled={+page <= 1}>Previous</Button>
                <Badge badgeContent={page} color='primary'>
                    <ArticleIcon sx={{color: darkMode ? 'action' : 'white'}}/>
                </Badge>
                <Button className={!darkMode && css.Button} sx={{
                    width: '7vw',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: darkMode ? 'primary' : 'white',
                    bgcolor: darkMode ? 'primary' : '#0000b0'
                }} variant="contained" onClick={next} disabled={+page >= 500}>Next</Button>
            </div>
        </div>
    );
};

export {MoviesList};