import {useAppDispatch, useAppLocation} from "../hooks";
import {IMovieRes} from "../interfaces";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {movieActions} from "../store";
import {MovieInfo} from "../components";

const MovieInfoPage = () => {

    const {state} = useAppLocation<{ movie: IMovieRes, movieByKeyWord: IMovieRes }>();
    const [movieInfo, setMovieInfo] = useState<IMovieRes>(null)
    const dispatch = useAppDispatch();
    const {id} = useParams();

    useEffect(() => {
        if (state?.movie) {
            setMovieInfo(state.movie);
        } else if (state?.movieByKeyWord) {
            setMovieInfo(state.movieByKeyWord);
        } else {
            dispatch(movieActions.getMovieById({id})).then((data) => {
                if (data.payload !== null && data.payload !== undefined) {
                    setMovieInfo(data.payload as IMovieRes);
                }
            });
        }
    }, [id, state, dispatch]);

    return (
        <div>
            {movieInfo && <MovieInfo movieInfo={movieInfo}/>}
        </div>
    );
};

export {MovieInfoPage};