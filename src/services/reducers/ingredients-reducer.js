import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
} from "../actions/ingredients";

const initialState = {
  ingredientRequest: false,
  ingredientFailed: false,
  ingredientPending: true,
  ingredients: [],
};

export const burgerIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientRequest: true,
        ingredientFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientRequest: false,
        ingredientFailed: false,
        ingredientPending: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientRequest: false,
        ingredientFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};