export interface ISearch {
    page: number | null,
    results: ISearchRes[]
}

export interface ISearchRes {
    id: number,
    name: string
}

export interface ISearchKeyWord {
    keyWord: string
}