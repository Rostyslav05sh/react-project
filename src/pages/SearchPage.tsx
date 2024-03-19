import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import { SearchByKeyWord } from "../components/SearchContainer/SearchByKeyWord";
import {useAppDispatch, useAppSelector, usePageQuery} from "../hooks";
import {IMovieRes, ISearchRes} from "../interfaces";
import { movieActions } from "../store";

interface IProps extends PropsWithChildren {
    moviesBySearch?: ISearchRes
}

const SearchPage: FC<IProps> = ({moviesBySearch}) => {
    // console.log(moviesBySearch);

    const [movieByKeyWordId, setMovieByKeyWordId] = useState<IMovieRes>(null)
    const {results} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();



    useEffect(() => {
        if (moviesBySearch) {
            const {id} = moviesBySearch;
            if (id !== undefined && id !== null) {
                dispatch(movieActions.getMovieById({id: id.toString()})).then((data) => {
                    if (data.payload !== null && data.payload !== undefined) {
                        setMovieByKeyWordId(data.payload as IMovieRes);
                    }
                })
            }
        } else {
            setMovieByKeyWordId(null); // Очищення значення movieByKeyWordId, якщо moviesBySearch порожній
        }
        // return () => {
        //     // dispatch(movieActions.clearMovies());
        //     setMovieByKeyWordId(null)
        //     console.log(movieByKeyWordId)
        // };
    }, [moviesBySearch?.id, dispatch]);

    // useEffect(() => {
    //     return () => {
    //         setMovieByKeyWordId(null); // Очистити значення moviesBySearch
    //     };
    // }, [moviesBySearch?.id, dispatch]);

    // console.log(results);
    // console.log('dafga');
    // console.log((movieByKeyWordId));
    // console.log('dafga');

    return (
        <div>
            {movieByKeyWordId && <SearchByKeyWord movieBySearch={movieByKeyWordId}/>}
        </div>
    );
};

export {SearchPage};
