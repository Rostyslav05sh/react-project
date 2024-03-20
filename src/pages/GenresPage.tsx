import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector, usePageQuery} from "../hooks";
import {genreActions} from "../store";
import {MoviesByGenre} from "../components";

const GenresPage = () => {

    const {moviesByGenre} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();
    const {page, prev, next} = usePageQuery();
    const {id} = useParams();

    useEffect(() => {
        dispatch(genreActions.getMoviesByGenreId({id, page}))
    }, [id, page, dispatch]);

    return (
        <div>
            <button onClick={prev} disabled={+page <= 1}>Previous</button>
            <button onClick={next} disabled={+page >= 500}>Next</button>
            {moviesByGenre.map(movie => <MoviesByGenre key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {GenresPage};