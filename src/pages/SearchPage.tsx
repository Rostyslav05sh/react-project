import React, {FC, PropsWithChildren, useEffect, useState} from "react";

import {useAppDispatch} from "../hooks";
import {IMovieRes, ISearchRes} from "../interfaces";
import {movieActions} from "../store";
import {SearchByKeyWord} from "../components";

interface IProps extends PropsWithChildren {
    moviesBySearch?: ISearchRes
}

const SearchPage: FC<IProps> = ({moviesBySearch}) => {
    // console.log(moviesBySearch);

    const [movieByKeyWordId, setMovieByKeyWordId] = useState<IMovieRes>(null)
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
            setMovieByKeyWordId(null);
        }
    }, [moviesBySearch, moviesBySearch?.id, dispatch]);

    return (
        <div>
            {movieByKeyWordId && movieByKeyWordId.title && <SearchByKeyWord movieBySearch={movieByKeyWordId}/>}
        </div>
    );
};

export {SearchPage};