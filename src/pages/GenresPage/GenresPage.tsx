import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ArticleIcon from "@mui/icons-material/Article";
import {useAppDispatch, useAppSelector, usePageQuery} from "../../hooks";
import {genreActions} from "../../store";
import {MoviesByGenre} from "../../components";
import css from './GenrePage.module.css'

const GenresPage = () => {

    const {moviesByGenre} = useAppSelector(state => state.genres);
    const {darkMode} = useAppSelector(state => state.darkMode);
    const dispatch = useAppDispatch();
    const {page, prev, next} = usePageQuery();
    const {id} = useParams();

    useEffect(() => {
        dispatch(genreActions.getMoviesByGenreId({id, page}))
    }, [id, page, dispatch]);

    return (
        <div>
            <div className={darkMode? css.GenresPage : css.GenresPageDark}>
            {moviesByGenre.map(movie => <MoviesByGenre key={movie.id} movie={movie}/>)}
            </div>
            <div className={css.GenresPageButtons}>
                <Button className={!darkMode && css.Button} sx={{width: '7vw', fontWeight: 'bold', fontSize: '16px'}} variant="contained" onClick={prev} disabled={+page <= 1}>Previous</Button>
                <Badge badgeContent={page} color="primary">
                    <ArticleIcon color="action" sx={{color: darkMode? 'action' : 'white'}}/>
                </Badge>
                <Button className={!darkMode && css.Button} sx={{width: '7vw', fontWeight: 'bold', fontSize: '16px'}} variant="contained" onClick={next} disabled={+page >= 500}>Next</Button>
            </div>
        </div>
    );
};

export {GenresPage};