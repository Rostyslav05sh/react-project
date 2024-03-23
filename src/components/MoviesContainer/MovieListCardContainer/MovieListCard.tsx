import React, {FC, PropsWithChildren} from "react";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import css from './MovieListCard.module.css'
import Badge from "@mui/material/Badge";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import {useAppSelector} from "../../../hooks";

interface IProps extends PropsWithChildren {
    movie: IMovieRes
}

const MovieListCard: FC<IProps> = ({movie}) => {

    const {title, poster_path, vote_average, release_date, adult} = movie;

    const {darkMode} = useAppSelector(state => state.darkMode);
    const navigate = useNavigate();

    const image = poster + poster_path

    return (
        <div className={css.MovieListCard}>
            <div className={darkMode? css.MovieListCardTitle : css.MovieListCardTitleDark}>{title}</div>
            <img className={darkMode? css.MovieListCardPoster : css.MovieListCardPosterDark} onClick={() => navigate('/movieInfo', {state: {movie}})} src={image} alt={`poster of ${title} movie`}/>
            <div className={css.MovieListCardInfo}>
            <Rating sx={{zIndex: '1'}} name="half-rating-read" defaultValue={vote_average / 2} precision={0.5} readOnly
                    size={"large"}
                    emptyIcon={
                        <StarBorderIcon fontSize="inherit" sx={{ color: 'grey'}}/>
                    }
            />
            <div className={darkMode? css.MovieListCardDate : css.MovieListCardDateDark}>{release_date}</div>
            <div>{adult ?
                <Badge badgeContent={'18+'} color="error">
                    <DoDisturbIcon sx={{color: darkMode? 'action' : 'white'}}/>
                </Badge>
                :
                <Badge badgeContent={'12+'} color="success">
                    <ChildCareIcon sx={{color: darkMode? 'action' : 'white'}}/>
                </Badge>
            }</div>
            </div>
        </div>
    );
};

export {MovieListCard};