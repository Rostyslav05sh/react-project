import {useNavigate} from "react-router-dom";

import css from './Header.module.css'
import {Genres} from "../GenresContainer";

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