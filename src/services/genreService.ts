import {IRes} from "../types";
import {IGenre, IGenreRes, IMovie} from "../interfaces";
import {apiService} from "./ApiService";
import {urls} from "../constants";

const genreService = {
    getAllGenres: (): IRes<IGenre> => apiService.get(urls.genres.base),
    getGenreById: (id: number): IRes<IGenreRes> => apiService.get(urls.genres.genreById(id)),
    getMoviesByGenreId: (id: string, page: string): IRes<IMovie> => apiService.get(urls.genres.moviesByGenres(id), {params: {page}})
}

export {
    genreService
}