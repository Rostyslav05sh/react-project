import React, {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import {Rating} from "@mui/material";

import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";

interface IProps extends PropsWithChildren {
    movie: IMovieRes
}

const MoviesByGenre: FC<IProps> = ({movie}) => {

    const {title, poster_path, vote_average} = movie;

    const navigate = useNavigate();

    const image = poster + poster_path

    return (
        <div onClick={() => navigate('/movieInfo', {state: {movie}})}>
            <div>{title}</div>
            <img src={image} alt={`poster of ${title} movie`}/>
            <Rating name="half-rating-read" defaultValue={vote_average / 2} precision={0.5} readOnly size={"large"}/>
        </div>
    );
};

export {MoviesByGenre};