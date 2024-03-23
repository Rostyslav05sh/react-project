import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Rating} from "@mui/material";
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Badge from '@mui/material/Badge';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ChildCareIcon from '@mui/icons-material/ChildCare';

import {IGenreRes, IMovieRes} from "../../../interfaces";
import {poster} from "../../../constants";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genreActions} from "../../../store";
import css from './MovieInfo.module.css'
import StarBorderIcon from "@mui/icons-material/StarBorder";


interface IProps extends PropsWithChildren {
    movieInfo: IMovieRes
}

const MovieInfo: FC<IProps> = ({movieInfo}) => {

    const {title, poster_path, adult, overview, vote_average, genre_ids, genres, release_date} = movieInfo;

    const image = poster + poster_path

    const [genreData, setGenreData] = useState<IGenreRes[]>()
    const {darkMode} = useAppSelector(state => state.darkMode);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
        <div className={css.MovieInfo}>
            <div className={css.MovieInfoDiv}>
                <div className={darkMode? css.MovieInfoTitle : css.MoviesByGenreTitleDark}>{title}</div>
                <div className={css.posterDiv}>
                    <img className={darkMode? css.MovieInfoPoster : css.MovieInfoPosterDark} src={image} alt={`poster of ${title} movie`}/>
                    <div className={css.genres}>{
                        genreData ? (
                                genreData.map(movieGenre =>
                                    <div className={css.genre}
                                         onClick={() => navigate(`/genre/${movieGenre.id}`)} key={movieGenre.id}>
                                        <Button variant="outlined"
                                                sx={{bgcolor: 'inherit', color: darkMode? 'black' : 'white', borderRadius: '35%', fontWeight: 'bold', fontSize: '12px', width: '7vw'}}>
                                            {movieGenre.name}
                                        </Button>
                                    </div>
                                )
                            )
                            :
                            (
                                genres && genres.map(genre =>
                                    <div className={css.genre}
                                         onClick={() => navigate(`/genre/${genre.id}`)} key={genre.id}>
                                        <Button variant="outlined"
                                                sx={{bgcolor: 'inherit', color: darkMode? 'black' : 'white', borderRadius: '35%', fontWeight: 'bold', fontSize: '12px', width: '7vw'}}>
                                            {genre.name}
                                        </Button>
                                    </div>
                                ))
                    }
                    </div>
                </div>
                <div className={css.MovieInfoOverview}>
                    <Accordion sx={{width: '20vw', marginTop: '2vh', bgcolor: darkMode? '#1976d2' : '#00008b'}}>
                        <AccordionSummary
                            sx={{width: '20vw'}}
                            expandIcon={<ArrowDropDownIcon sx={{color: darkMode? 'black' : 'white'}}/>}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography sx={{color: darkMode? 'black' : 'white'}}>Short overview about movie: {title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{color: darkMode? 'black' : 'white'}}>
                                {overview}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <div className={css.MovieInfoDateRating}>
                        <Rating sx={{zIndex: '1'}} name="half-rating-read" defaultValue={vote_average / 2}
                                precision={0.5} readOnly
                                size={"large"}
                                emptyIcon={
                                    <StarBorderIcon fontSize="inherit" sx={{ color: 'grey'}}/>
                                }
                        />
                        <div className={darkMode? css.MovieInfoDate : css.MovieInfoDateDark}>{release_date}</div>
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
            </div>


        </div>

    );
};

export {MovieInfo};
