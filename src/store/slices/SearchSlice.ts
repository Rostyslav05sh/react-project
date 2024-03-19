import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ISearch, ISearchRes} from "../../interfaces";
import {searchService} from "../../services";
import {AxiosError} from "axios";

interface IState {
   page: string
   result: ISearchRes[]
}

const initialState:IState = {
    page: null,
    result: []
}

const getAll = createAsyncThunk<ISearch, {keyWord: string, page: string}>(
    'getAll/searchSlice',
    async ({keyWord, page}, {rejectWithValue}) => {
        try {
            const {data} = await searchService.getMovieByKeyWord(keyWord, page);
            return data
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.result = action.payload.results
                state.page = action.payload.page.toString()
            })
    }
})


const {reducer: searchReducer, actions} = searchSlice;

const searchActions = {
    ...actions,
    getAll
}

export {
    searchActions,
    searchReducer
}