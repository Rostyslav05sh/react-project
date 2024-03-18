import {apiService} from "./ApiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IMovie} from "../interfaces";

const movieService = {
    getAllMovies: (page: string):IRes<IMovie> => apiService.get(urls.movies.base, {params: {page}}),
    getMovieById: (id: string):IRes<IMovie> => apiService.get(urls.movies.movieById(id))
}

export {
    movieService
}