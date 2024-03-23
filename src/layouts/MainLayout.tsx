import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/Header/Header";
import {useAppSelector} from "../hooks";


const MainLayout = () => {

    const {darkMode} = useAppSelector(state => state.darkMode);

    useEffect(() => {
        if (darkMode) {
            document.body.style.backgroundColor = "white";
        } else {
            document.body.style.backgroundColor = '#00032d';
        }
    }, [darkMode]);

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};