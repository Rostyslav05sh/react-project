import React, {FC, PropsWithChildren} from "react";
import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import {Rating} from "@mui/material";

interface IProps extends PropsWithChildren {
    movieInfo: IMovieRes
}

const MovieInfo: FC<IProps> = ({movieInfo}) => {

    const {title, poster_path, adult, overview, vote_average, genre_ids, release_date} = movieInfo;

    const image = poster + poster_path

    return (
        <div>
            <img src={image} alt={`poster of ${title} movie`}/>
            <div>
            <div>{title}</div>
                <div>{overview}</div>
                <div>{release_date}</div>
                <div>{adult? 'Not for Kids 18+' : 'Good for kids'}</div>
                <Rating name="half-rating-read" defaultValue={vote_average/2} precision={0.5} readOnly size={"large"} />
            </div>
        </div>
    );
};

export {MovieInfo};
