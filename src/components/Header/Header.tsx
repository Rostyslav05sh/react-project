import css from './Header.module.css'
import {useNavigate} from "react-router-dom";
import {Genres} from "../GenresContainer";
import {usePageQuery} from "../../hooks";
import {SearchForm} from "../SearchContainer/SearchForm";

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className={css.Header}>
            <div onClick={() => navigate('movies')}>Home</div>
            <div>
                <div>
                    <Genres/>
                </div>
                <button onClick={() => navigate('/search')}>Search</button>
            </div>
        </div>
    );
};

export {Header};