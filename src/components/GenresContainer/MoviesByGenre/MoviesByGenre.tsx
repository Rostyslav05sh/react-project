import React, {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import {Rating} from "@mui/material";

import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import Badge from "@mui/material/Badge";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import css from './MoviesByGenre.module.css'

interface IProps extends PropsWithChildren {
    movie: IMovieRes
}

const MoviesByGenre: FC<IProps> = ({movie}) => {

    const {title, poster_path, vote_average, release_date, adult} = movie;

    const navigate = useNavigate();

    const image = poster + poster_path

    return (
        <div className={css.MoviesByGenre} onClick={() => navigate('/movieInfo', {state: {movie}})}>
            <div className={css.MoviesByGenreTitle}>{title}</div>
            <img className={css.MoviesByGenrePoster} src={image} alt={`poster of ${title} movie`}/>
            <div className={css.MoviesByGenreInfo}>
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

export {MoviesByGenre};