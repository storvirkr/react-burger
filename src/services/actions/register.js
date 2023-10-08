import {URL, register} from "../../utils/api-request";
import { checkResponse } from "../../utils/api-request";
import { getCookie } from "../cookie";

export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAILED = "GET_REGISTER_FAILED";

export const registration = (form, dispatch) => {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    fetch(`${URL + register}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({
            name: form.name,
            password: form.password,
            email: form.email,
        })
    })
      .then(checkResponse)
      .then((res) => {
          if(res && res.success) {
              dispatch({
                  type: GET_REGISTER_SUCCESS,
                  message: res.message,
              });
          }
      })
      .catch((error) => {
        dispatch({
          type: GET_REGISTER_FAILED,
          message: error.message,
        });
        console.log(error);
      });
};