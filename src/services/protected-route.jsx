import {createContext, useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, logoutUser} from "./actions/auth";

const ProtectedRouteContext = createContext(null);

export const ProtectedRouteProvider = ({ children }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(store => store.authReducer.isAuth);

    const logIn = (body) => {
        dispatch(loginUser(body));
    };

    const logOut = (body) => {
        dispatch(logoutUser(body));
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

export const RequireAuth = ({ children }) => {
    const isAuth = useSelector(store => store.authReducer.isAuth);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireLogIn = ({ children }) => {
    const isAuth = useSelector(store => store.authReducer.isAuth);
    const location = useLocation();

    if (isAuth) {
        return <Navigate to="/profile" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireReset = ({ children }) => {
    const data = useSelector(store => store.authReducer);
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