import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ArticleIcon from "@mui/icons-material/Article";
import Stack from '@mui/material/Stack';

import {ISearchKeyWord} from "../../../interfaces";
import {useAppDispatch, useAppSelector, usePageQuery} from "../../../hooks";
import {searchActions} from "../../../store";
import {SearchPage} from "../../../pages";
import css from './SearchForm.module.css'

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchForm = () => {

    const {register, reset, handleSubmit} = useForm<ISearchKeyWord>();
    const [keyWord, setKeyWord] = useState<string>();
    const navigate = useNavigate();
    const {result} = useAppSelector(state => state.search);
    const {darkMode} = useAppSelector(state => state.darkMode);
    const dispatch = useAppDispatch();
    const {page, prev, next} = usePageQuery();

    const searchMovie: SubmitHandler<ISearchKeyWord> = (query) => {
        setKeyWord(query.keyWord)
    }
    const formReset = () => {
        reset();
    };

    useEffect(() => {
        dispatch(searchActions.getAll({keyWord, page}))
    }, [keyWord, page, dispatch]);


    return (
        <div className={css.SearchForm}>
            <div className={css.SearchFormInput}>
                <Box sx={{flexGrow: 1, backgroundColor: 'transparent', boxShadow: 'none'}}>
                    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                        <Toolbar>
                            <Search sx={{marginRight: '1vw'}}>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <form onSubmit={handleSubmit(formReset)}>
                                    <StyledInputBase
                                        onChange={(e) => setKeyWord(e.target.value)}
                                        placeholder="Search…"
                                        inputProps={{'aria-label': 'search'}}
                                        {...register('keyWord')}
                                    />
                                </form>
                            </Search>
                            <Button sx={darkMode? {color: 'white', fontWeight: 'bold', fontSize: '16px'} : {bgcolor: '#0000b0', color: 'white', fontWeight: 'bold', fontSize: '16px'}} variant="contained"
                                    onClick={handleSubmit(searchMovie)}>Search</Button>
                        </Toolbar>
                    </AppBar>
                </Box>

            </div>
            <div className={css.SearchFormMovies}>
                {result.map(moviesBySearch => <SearchPage key={moviesBySearch.id}
                                                          moviesBySearch={moviesBySearch}></SearchPage>)}
            </div>
            <div className={keyWord ? css.SearchFormButtons : css.SearchFormButtonsNone}>
                <Button sx={{width: '7vw', fontWeight: 'bold', fontSize: '16px'}} variant="contained" onClick={prev}
                        disabled={+page <= 1}>Previous</Button>
                <Badge badgeContent={page} color="primary">
                    <ArticleIcon color="action"/>
                </Badge>
                <Button sx={{width: '7vw', fontWeight: 'bold', fontSize: '16px'}} variant="contained" onClick={next}
                        disabled={+page >= 500}>Next</Button>
            </div>
        </div>
    );
};

export {SearchForm};