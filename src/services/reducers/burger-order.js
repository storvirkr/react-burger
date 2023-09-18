import {
    PLACE_NEW_ORDER_REQUEST,
    PLACE_NEW_ORDER_SUCCESS,
    PLACE_NEW_ORDER_ERROR,
    CLOSE_MODAL_ORDER
  } from '../actions/order'
  
  const initialState = {
    orderRequest: false,
    orderFailed: false,
    isOrderDetailsOpened: false,
    currentOrder: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLACE_NEW_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true,
          orderFailed: false,
        }
      }
      case PLACE_NEW_ORDER_SUCCESS: {
        return {
          ...state,
          orderRequest: true,
          orderFailed: false,
          currentOrder: action.order,
          isOrderDetailsOpened: true,
        };
      }
      case PLACE_NEW_ORDER_ERROR: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: true,
        };
      }
      case CLOSE_MODAL_ORDER:{
        return{
          ...state,
          isOrderDetailsOpened: false,
          currentOrder: null
        }
      }
      default: {
        return state;
      }
    }
  };
  
  