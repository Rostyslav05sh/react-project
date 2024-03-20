import {FC, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

import {IGenreRes} from "../../../interfaces";

interface IProps extends PropsWithChildren {
    genre: IGenreRes
}

const Genre: FC<IProps> = ({genre}) => {

    const {id, name} = genre;
    const navigate = useNavigate();

    return (
        <div>
            <div onClick={() => navigate(`/genre/${id}`)}>{name}</div>
        </div>
    );
};

export {Genre};