import css from './Header.module.css'
import {useNavigate} from "react-router-dom";
import {Genres} from "../GenresContainer";

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className={css.Header}>
            <div onClick={() => navigate('movies')}>Home</div>
            <div>
                <div>Genres</div>
                <div>
                    <Genres/>
                </div>
                <div>Search</div>
            </div>
        </div>
    );
};

export {Header};