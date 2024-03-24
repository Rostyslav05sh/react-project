import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import Button from '@mui/material/Button';

import {IGenreRes} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genresActiveActions} from "../../../store";
import css from './Genre.module.css'

interface IProps extends PropsWithChildren {
    genre: IGenreRes
}

const Genre: FC<IProps> = ({genre}) => {

    const {id, name} = genre;
    const {darkMode} = useAppSelector(state => state.darkMode);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const setGenresActive = () => {
        dispatch(genresActiveActions.setActive())
    }

    return (
        <div className={`${css.genre} ${css.genreCol}`}>
            <Button variant="contained" sx={{
                height: '3.5vh',
                justifyContent: 'start',
                width: '12vw',
                color: 'white',
                bgcolor: darkMode ? 'primary' : '#0000b0'
            }} onClick={() => {
                navigate(`/genre/${id}`)
                setGenresActive()
            }
            }>{name}</Button>
        </div>
    );
};

export {Genre};