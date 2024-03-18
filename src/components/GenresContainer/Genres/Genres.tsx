import {useAppDispatch, useAppSelector} from "../../../hooks";
import {useEffect} from "react";
import {genreActions} from "../../../store";
import {Genre} from "../Genre";

const Genres = () => {

const {genres} = useAppSelector(state => state.genres);
const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, []);

    return (
        <div>
            {genres.map(genre => <Genre key={genre.id} genre={genre}/>)}
        </div>
    );
};

export {Genres};