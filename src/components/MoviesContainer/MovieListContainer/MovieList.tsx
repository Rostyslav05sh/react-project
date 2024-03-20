import React, {useEffect} from "react";

import {useAppDispatch, useAppSelector, usePageQuery} from "../../../hooks";
import {MovieListCard} from "../MovieListCardContainer";
import {movieActions} from "../../../store";

const MoviesList = () => {

    const {results} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {page, prev, next} = usePageQuery();

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
    }, [page, dispatch]);

    return (
        <div>
            <button onClick={prev} disabled={+page <= 1}>Previous</button>
            <button onClick={next} disabled={+page >= 500}>Next</button>
            {results && results.map(movie => <MovieListCard key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {MoviesList};