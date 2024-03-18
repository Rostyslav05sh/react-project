export interface IMovie {
    moviePage: string,
    results: IMovieRes[]
}

export interface IMovieRes {
    adult: boolean;
    genre_ids: number[];
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
}