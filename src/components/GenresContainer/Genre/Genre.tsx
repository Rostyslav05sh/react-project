import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import {IGenreRes} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genresActiveActions} from "../../../store";
import css from './Genre.module.css'

interface IProps extends PropsWithChildren {
    genre: IGenreRes
}

const Genre: FC<IProps> = ({genre}) => {

    const {id, name} = genre;
    const {genresActive} = useAppSelector(state => state.genresActive);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const setGenresActive = () => {
        dispatch(genresActiveActions.setActive())
    }

    return (
        <div className={`${css.genre} ${css.genreCol}`}>
            <Button variant="contained" sx={{color: 'white', height: '3.5vh', justifyContent: 'start', width: '12vw'}} onClick={() => {
                navigate(`/genre/${id}`)
                setGenresActive()
            }
            }>{name}</Button>
        </div>
    );
};

export {Genre};