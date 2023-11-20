import {FC, createContext, useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, logoutUser} from "./actions/auth";
import { IAppContextInterface, IAuthProvider, TAuthBody } from "../utils/types";

const ProtectedRouteContext = createContext<IAppContextInterface | null>(null);

export const ProtectedRouteProvider: FC<IAuthProvider> = ({ children }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector((store: any) => store.authReducer.isAuth);

    const logIn = (body: TAuthBody) => {
        dispatch(loginUser(body) as any);
    };

    const logOut = (body: TAuthBody) => {
        dispatch(logoutUser(body) as any);
    };

    return (
        <ProtectedRouteContext.Provider value={{isAuth, logIn, logOut}}>
            {children}
        </ProtectedRouteContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(ProtectedRouteContext);
}

export const RequireAuth: ({children}: { children: JSX.Element }) => (JSX.Element) = ({ children }) => {
    const isAuth = useSelector((store: any) => store.authReducer.isAuth);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireLogIn: ({children}: { children: JSX.Element }) => (JSX.Element) = ({ children }) => {
    const isAuth = useSelector((store: any) => store.authReducer.isAuth);
    const location = useLocation();

    if (isAuth) {
        return <Navigate to="/profile" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireReset: ({children}: { children: JSX.Element }) => (JSX.Element) = ({ children }) => {
    const data = useSelector((store: any) => store.authReducer);
    const location = useLocation();

    if (!data.isForgot) {
        return (
            <Navigate
                to={data.isAuth === true ? '/profile' : '/login'}
                state={{ path: location.pathname }}
            />
        )
    }

    return children;
}