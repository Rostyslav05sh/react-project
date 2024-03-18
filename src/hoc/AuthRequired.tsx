import {FC, PropsWithChildren} from "react";
import {useAppLocation} from "../hooks/UseAppLocation";
import {Navigate} from "react-router-dom";

interface IProps extends PropsWithChildren {

}

const AuthRequired: FC<IProps> = ({children}) => {
    const access = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjRiOWE3M2RmNGJjMDY5Y2VjNzk4MjI1Y2QwNTgxNyIsInN1YiI6IjY1ZGM3YTg4ZDQ2NTM3MDE0YWNmNTFlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z7oxnfke1KKPbyFNoHEYzWqCP3z6AACkN3k4n1yGxbc'
    const {pathname} = useAppLocation()

    if (!access) {
        return <Navigate to={'/login'} state={pathname}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export {AuthRequired};