import React, {FC, PropsWithChildren} from "react";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";

interface IProps extends PropsWithChildren {
    movieBySearch: IMovieRes
}

const SearchByKeyWord: FC<IProps> = ({movieBySearch}) => {

    const {title, poster_path, vote_average} = movieBySearch;

    const navigate = useNavigate();

    const image = poster + poster_path

    return (
        <div onClick={() => navigate('/movieInfo', {state: {movieBySearch}})}>
            <div>{title}</div>
            <img src={image} alt={`poster of ${title} movie`}/>
            <Rating name="half-rating-read" defaultValue={vote_average / 2} precision={0.5} readOnly size={"large"}/>
        </div>
    );
};

export {SearchByKeyWord};