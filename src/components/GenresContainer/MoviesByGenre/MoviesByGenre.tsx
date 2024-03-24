import React, {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {Rating} from "@mui/material";
import Badge from "@mui/material/Badge";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import {useAppSelector} from "../../../hooks";
import css from './MoviesByGenre.module.css'

interface IProps extends PropsWithChildren {
    movie: IMovieRes
}

const MoviesByGenre: FC<IProps> = ({movie}) => {

    const {title, poster_path, vote_average, release_date, adult} = movie;

    const {darkMode} = useAppSelector(state => state.darkMode);
    const navigate = useNavigate();

    const image = poster + poster_path

    return (
        <div className={css.MoviesByGenre} onClick={() => navigate('/movieInfo', {state: {movie}})}>
            <div className={darkMode ? css.MoviesByGenreTitle : css.MoviesByGenreTitleDark}>{title}</div>
            <img className={darkMode ? css.MoviesByGenrePoster : css.MoviesByGenrePosterDark} src={image}
                 alt={`poster of ${title} movie`}/>
            <div className={css.MoviesByGenreInfo}>
                <Rating sx={{zIndex: '1'}} name="half-rating-read" defaultValue={vote_average / 2} precision={0.5}
                        readOnly
                        size={"large"}
                        emptyIcon={
                            <StarBorderIcon fontSize="inherit" sx={{color: 'grey'}}/>
                        }
                />
                <div className={darkMode ? css.MoviesByGenreDate : css.MoviesByGenreDateDark}>{release_date}</div>
                <div>{adult ?
                    <Badge badgeContent={'18+'} color="error">
                        <DoDisturbIcon sx={{color: darkMode ? 'action' : 'white'}}/>
                    </Badge>
                    :
                    <Badge badgeContent={'12+'} color="success">
                        <ChildCareIcon sx={{color: darkMode ? 'action' : 'white'}}/>
                    </Badge>
                }</div>
            </div>
        </div>
    );
};

export {MoviesByGenre};