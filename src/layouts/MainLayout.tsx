import {Outlet} from "react-router-dom";
import React from "react";
import {Header} from "../components";
import { SearchForm } from "../components/SearchContainer/SearchForm";

const MainLayout = () => {
    return (
        <div>
            <Header/>
            {/*<SearchForm/>*/}
            <Outlet/>
        </div>
    );
};

export {MainLayout};