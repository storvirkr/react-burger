import { createOrder } from "../../utils/api-request";

export const PLACE_NEW_ORDER_REQUEST = 'PLACE_NEW_ORDER_REQUEST'
export const PLACE_NEW_ORDER_SUCCESS = 'PLACE_NEW_ORDER_SUCCESS'
export const PLACE_NEW_ORDER_ERROR = 'PLACE_NEW_ORDER_ERROR'
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER'


export function createOrderList(arr) {
  return function (dispatch) {
    dispatch({
      type: PLACE_NEW_ORDER_REQUEST
    });
    createOrder(arr)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: PLACE_NEW_ORDER_SUCCESS,
            order: res.order.number
          });
        } else {
          dispatch({
            type: PLACE_NEW_ORDER_ERROR
          });
        }
      })
      .catch((e) => console.log("Something went wrong", e));
  };
}