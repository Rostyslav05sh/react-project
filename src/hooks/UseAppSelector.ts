import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../types/reduxType";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector