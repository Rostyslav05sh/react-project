import {FC, PropsWithChildren} from "react";
import {IGenreRes} from "../../../interfaces";
import {useNavigate} from "react-router-dom";

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