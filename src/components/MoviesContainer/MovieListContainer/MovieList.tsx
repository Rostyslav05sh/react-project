import React, {useEffect} from "react";

import {useAppDispatch, useAppSelector, usePageQuery} from "../../../hooks";
import {MovieListCard} from "../MovieListCardContainer";
import {movieActions} from "../../../store";

const MoviesList = () => {

    const {results} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {page, prev, next} = usePageQuery();

    console.log(page)

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
    }, [page, dispatch]);

    const movies = results

    return (
        <div>
            <button onClick={prev} disabled={+page <= 1}>Previous</button>
            <button onClick={next} disabled={+page >= 500}>Next</button>
            {movies.map(movie => <MovieListCard key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {MoviesList};