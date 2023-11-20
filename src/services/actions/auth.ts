import {URL, checkResponse} from "../../utils/api-request";
import {deleteCookie, getCookie, setCookie} from "../cookie";

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const RECOVERY_REQUEST = 'RECOVERY_REQUEST';
export const RECOVERY_SUCCESS = 'RECOVERY_SUCCESS';
export const RECOVERY_FAILED = 'RECOVERY_FAILED';

export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

export const SET_USER = 'SET_USER';

const signIn = (data: any) => {
    return {
        type: SIGN_IN_USER,
        payload: data
    };
};

const signOut = () => {
    return {
        type: SIGN_OUT_USER
    };
};

const registerUserSuccess = () => {
    return {
        type: REGISTER_USER_SUCCESS
    };
};

const registerUserFailed = () => {
    return {
        type: REGISTER_USER_FAILED
    };
};

const recoverySuccess = () => {
    return {
        type: RECOVERY_SUCCESS
    };
};

const recoveryFailed = () => {
    return {
        type: RECOVERY_FAILED
    };
};

const resetSuccess = () => {
    return {
        type: RESET_SUCCESS
    };
};

const resetFailed = () => {
    return {
        type: RESET_FAILED
    };
};

const setUser = (data: any) => {
    return {
        type: SET_USER,
        payload: data
    };
};

export const recoveryRequest = () => {
    return {
        type: RECOVERY_REQUEST
    };
};



export function loginUser(body: any) {
    return (dispatch: any) => {
        fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            // @ts-ignore
            const accessToken = data.accessToken.split('Bearer ')[1];
            // @ts-ignore
            const refreshToken = data.refreshToken;
            if (accessToken) {
                setCookie('token', accessToken);
            }
            if (refreshToken) {
                setCookie('refreshToken', refreshToken);
            }
            // @ts-ignore
            dispatch(signIn({ ...data.user }));
        })
        .catch(e => {
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function logoutUser(body: any) {
    return (dispatch: any) => {
        fetch(`${URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(() => {
            deleteCookie('token');
            deleteCookie('refreshToken');
            dispatch(signOut());
        })
        .catch(e => {
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function registerUser(body: any) {
    return (dispatch: any) => {
        fetch(`${URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            // @ts-ignore
            const accessToken = data.accessToken.split('Bearer ')[1];
            // @ts-ignore
            const refreshToken = data.refreshToken;
            if (accessToken) {
                setCookie('token', accessToken);
            }
            if (refreshToken) {
                setCookie('refreshToken', refreshToken);
            }
            dispatch(registerUserSuccess());
        })
        .catch(e => {
            dispatch(registerUserFailed())
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function updateToken() {
    return (dispatch:any) => {
        fetch(`${URL}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'token': getCookie('refreshToken') })
        })
        .then(checkResponse)
        .then(data => {
            // @ts-ignore
            const accessToken = data.accessToken.split('Bearer ')[1];
            // @ts-ignore
            const refreshToken = data.refreshToken;
            if (accessToken) {
                setCookie('token', accessToken);
            }
            if (refreshToken) {
                setCookie('refreshToken', refreshToken);
            }
            console.log('Токены обновились');
        })
        .catch(e => {
            dispatch(registerUserFailed())
            console.log(`Что-то пошло не так ${e}`);
        })
    }
}

export function requestRecovery(body: any) {
    return (dispatch: any) => {
        fetch(`${URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(() => {
            dispatch(recoverySuccess());
        })
        .catch(e => {
            dispatch(recoveryFailed());
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function resetPassword(body: any) {
    return (dispatch: any) => {
        fetch(`${URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(() => {
            dispatch(resetSuccess());
        })
        .catch(e => {
            dispatch(resetFailed());
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function getUser() {
    return (dispatch: any) => {
        fetch(`${URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
        })
        .then(checkResponse)
        .then(data => {
            // @ts-ignore
            if (data.success) {
                dispatch(setUser(data));
            } else {
                dispatch(updateToken())
            }
        })
        .catch(e => {
            dispatch(resetFailed);
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function updateUser(body: any) {
    return (dispatch: any) => {
        fetch(`${URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            dispatch(setUser(data));
        })
        .catch(e => {
            dispatch(resetFailed());
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}