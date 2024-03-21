import React, {FC, PropsWithChildren} from "react";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import css from './MovieListCard.module.css'
import Badge from "@mui/material/Badge";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ChildCareIcon from "@mui/icons-material/ChildCare";

interface IProps extends PropsWithChildren {
    movie: IMovieRes
}

const MovieListCard: FC<IProps> = ({movie}) => {

    const {title, poster_path, vote_average, release_date, adult} = movie;

    const navigate = useNavigate();

    const image = poster + poster_path

    return (
        <div className={css.MovieListCard} onClick={() => navigate('/movieInfo', {state: {movie}})}>
            <div className={css.MovieListCardTitle}>{title}</div>
            <img className={css.MovieListCardPoster} src={image} alt={`poster of ${title} movie`}/>
            <div className={css.MovieListCardInfo}>
            <Rating sx={{zIndex: '1'}} name="half-rating-read" defaultValue={vote_average / 2} precision={0.5} readOnly
                    size={"large"}/>
            <div>{release_date}</div>
            <div>{adult ?
                <Badge badgeContent={'18+'} color="error">
                    <DoDisturbIcon color="action" />
                </Badge>
                :
                <Badge badgeContent={'12+'} color="success">
                    <ChildCareIcon color="action" />
                </Badge>
            }</div>
            </div>
        </div>
    );
};

export {MovieListCard};