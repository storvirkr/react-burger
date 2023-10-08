import { URL, token, user, logout } from "../../utils/api-request";
import { checkResponse } from "../../utils/api-request";
import { deleteCookie, getCookie, setCookie } from "../cookie";

export const GET_USER_REQUEST = "GET_LOGIN_REQUEST";
export const GET_USER_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_USER_FAILED = "GET_LOGIN_FAILED";

export const getUserData = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    fetch(`${URL + user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      },
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            userName: res.user.name,
            userEmail: res.user.email,
          });
        }
      })
      .catch((error) => {});
  };
};

export const refreshToken = () => {
  return function (dispatch) {
    return fetch(`${URL + token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(getUserData());
        }
      });
  };
};

export const userLogout = () => {
  return function (dispatch) {
    return fetch(`${URL + logout}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          dispatch(getUserData());
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

export const editUserData = (form) => {
  return function (dispatch) {
    return fetch(`${URL + user}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
      }),
    })
      .then(checkResponse)
      .then((res) => {})
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};
