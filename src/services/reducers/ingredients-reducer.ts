import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  isLoading: false,
  isFailed: false
};

export const burgerIngredientReducer = (state = initialState, action: any) => {
  switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
          return {
              ...state,
              isLoading: true
          }
      }
      case GET_INGREDIENTS_SUCCESS: {
          return {
              ...state,
              ingredients: action.payload,
              isLoading: false,
              isFailed: false
          }
      }
      case GET_INGREDIENTS_ERROR: {
          return {
              ...state,
              isFailed: true
          }
      }
      default: {
          return state;
      }
  }
};
