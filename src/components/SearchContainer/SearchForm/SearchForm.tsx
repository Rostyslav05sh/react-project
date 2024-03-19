import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ISearchKeyWord} from "../../../interfaces";
import {useAppDispatch, useAppSelector, usePageQuery} from "../../../hooks";
import {searchActions} from "../../../store";
import { SearchPage } from "../../../pages";

const SearchForm = () => {

    const {register, reset, handleSubmit} = useForm<ISearchKeyWord>();
    const [keyWord, setKeyWord] = useState<string>();
    const navigate = useNavigate();
    const {result} = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const {page ,prev, next} = usePageQuery();

    const searchMovie:SubmitHandler<ISearchKeyWord> = (query) => {
        setKeyWord(query.keyWord)
        reset()
    }

    useEffect(() => {
        dispatch(searchActions.getAll({keyWord, page}))
    }, [keyWord, page, dispatch]);

    // console.log(result)


    return (
        <div>
        <form onSubmit={handleSubmit(searchMovie)}>
            <input type="text" placeholder={'Search movie'} {...register('keyWord')}/>
            <button onClick={() => navigate('/search', {state: {keyWord}})}>Search</button>
        </form>
            <div>
            <button onClick={prev} disabled={+page <= 1}>Previous</button>
            <button onClick={next} disabled={+page >= 500}>Next</button>
            </div>
            {result.map(moviesBySearch => <SearchPage key={moviesBySearch.id} moviesBySearch={moviesBySearch}></SearchPage>)}
        </div>
    );
};

export {SearchForm};

