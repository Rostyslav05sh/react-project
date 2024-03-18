import {IRes} from "../types";
import {ISearch} from "../interfaces";
import {apiService} from "./ApiService";
import {urls} from "../constants";

const searchService = {
    getMovieByKeyWord: (word: string, page: number):IRes<ISearch> => apiService.get(urls.search.searchByKeyWord(word), {params: {page}})
}

export {
    searchService
}