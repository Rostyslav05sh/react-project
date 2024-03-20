import axios from "axios";

import {baseURL} from "../constants";

const apiService = axios.create({baseURL})

apiService.interceptors.request.use(request => {
    request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjRiOWE3M2RmNGJjMDY5Y2VjNzk4MjI1Y2QwNTgxNyIsInN1YiI6IjY1ZGM3YTg4ZDQ2NTM3MDE0YWNmNTFlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z7oxnfke1KKPbyFNoHEYzWqCP3z6AACkN3k4n1yGxbc'
    return request
})

export {
    apiService
}