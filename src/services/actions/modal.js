import { URL, checkResponse } from '../../utils/api-request';
import { resetCart } from './burger-constructor';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const UPDATE_ORDER_MODAL = 'UPDATE_ORDER_MODAL';
export const GET_ORDER_MODAL_REQUEST = 'GET_ORDER_MODAL_REQUEST';
export const GET_ORDER_MODAL_SUCCESS = 'GET_ORDER_MODAL_SUCCESS';
export const GET_ORDER_MODAL_FAILED = 'GET_ORDER_MODAL_FAILED';

export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';

export const orderModalRequest = () => {
    return {
        type: GET_ORDER_MODAL_REQUEST
    };
};

export const orderModalSuccess = (data) => {
    return {
        type: GET_ORDER_MODAL_SUCCESS,
        payload: data.order.number
    };
};

export const orderModalFailed = () => {
    return {
        type: GET_ORDER_MODAL_FAILED
    };
};

export const openModal = (ingredient) => {
    return {
        type: OPEN_INGREDIENT_MODAL,
        payload: ingredient
    };
};

export const selectIngredient = (ingredient) => {
    return {
        type: SELECT_INGREDIENT,
        payload: ingredient
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
};

export const updateOrderModal = (id) => {
    return {
        type: UPDATE_ORDER_MODAL,
        payload: id
    };
  };

  export function getOrderId(body) {
    return (dispatch) => {
        dispatch(orderModalRequest);

        fetch(`${URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            dispatch(orderModalSuccess(data));
            dispatch(resetCart());
        })
        .catch(e => {
            dispatch(orderModalFailed);
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}