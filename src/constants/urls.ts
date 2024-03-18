const baseURL = 'https://api.themoviedb.org/3'

const genres = '/genre/movie/list'
const poster ='https://image.tmdb.org/t/p/w500'
const movies = '/discover/movie'
const movieIdFind = '/movie'
const genre = '/genre'
const genreMovies = '/movies'
const search = '/search/keyword?query='

const urls = {
    movies: {
        base: movies,
        movieById:(id:string) => `${movieIdFind}/${id}`,
    },
    genres: {
        base: genres,
        moviesByGenres:(id:string) => `${genre}/${id}${genreMovies}`,
        genreById: (id:number) => `${genre}/${id}`
    },
    search: {
        searchByKeyWord: (word:string) => `${search}/${word}`
    }
}

export {
    baseURL,
    urls,
    poster
}