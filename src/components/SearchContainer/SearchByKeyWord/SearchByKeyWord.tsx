import React, {FC, PropsWithChildren} from "react";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import Badge from "@mui/material/Badge";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import css from './SearchByKeyWord.module.css'

interface IProps extends PropsWithChildren {
    movieBySearch: IMovieRes
}

const SearchByKeyWord: FC<IProps> = ({movieBySearch}) => {

    const {title, poster_path, vote_average, release_date, adult} = movieBySearch;

    const navigate = useNavigate();

    const image = poster + poster_path

    return (
        <div className={css.SearchByKeyWord} onClick={() => navigate('/movieInfo', {state: {movieBySearch}})}>
            <div className={css.SearchByKeyWordTitle}>{title}</div>
            <img className={css.SearchByKeyWordPoster} src={image} alt={`poster of ${title} movie`}/>
            <div className={css.SearchByKeyWordInfo}>
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

export {SearchByKeyWord};