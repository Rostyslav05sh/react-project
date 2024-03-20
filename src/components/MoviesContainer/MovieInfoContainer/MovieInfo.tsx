import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {Rating} from "@mui/material";

import {IGenreRes, IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import {useAppDispatch} from "../../../hooks";
import {genreActions} from "../../../store";

interface IProps extends PropsWithChildren {
    movieInfo: IMovieRes
}

const MovieInfo: FC<IProps> = ({movieInfo}) => {

    const {title, poster_path, adult, overview, vote_average, genre_ids, genres, release_date} = movieInfo;

    const image = poster + poster_path

    const [genreData, setGenreData] = useState<IGenreRes[]>()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchGenres = async () => {
            if (genre_ids && genre_ids.length > 0) {
                const promises = genre_ids.map(async (genreId) => {
                    const genre = await dispatch(genreActions.getGenreById({id: genreId}));
                    return genre.payload;
                });
                const genres = await Promise.all(promises);
                setGenreData(genres as IGenreRes[]);
            }
        };

        fetchGenres();
    }, [genre_ids, dispatch]);

    return (
        <div>
            <img src={image} alt={`poster of ${title} movie`}/>
            <div>
                <div>{title}</div>
                <div>{overview}</div>
                <div>{
                    genreData ? (
                            genreData.map(movieGenre =>
                                    <span>
                            {movieGenre.name}
                        </span>
                            )
                        )
                        :
                        (
                            genres && genres.map(genre =>
                                    <span>
                            {genre.name}
                        </span>
                            ))
                }
                </div>
                <div>{release_date}</div>
                <div>{adult ? 'Not for Kids 18+' : 'Good for kids'}</div>
                <Rating name="half-rating-read" defaultValue={vote_average / 2} precision={0.5} readOnly size={"large"}/>
            </div>
        </div>
    );
};

export {MovieInfo};
