import {useDispatch} from "react-redux";
import {AppDispatch} from "../types/reduxType";

export const useAppDispatch = () => useDispatch<AppDispatch>()