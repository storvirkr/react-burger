import {
    ADD_ITEM_TO_CONSTRUCTOR,
    DELETE_ITEM_FROM_CONSTRUCTOR,
    SORT_ITEMS,
    RESET_CART,
  } from '../actions/burger-constructor'
  
  const initialState = {
    bun: [],
    ingredients: [],
    isLoading: true,
  };
  
  export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM_TO_CONSTRUCTOR: {
        if (action.payload.type === 'bun') {
          return {
            ...state,
            bun: action.payload,
            isLoading: false
          }
        } else {
          return {
            ...state,
            ingredients: [...state.ingredients, {...action.payload}],
          }
        }
      }
      case DELETE_ITEM_FROM_CONSTRUCTOR: {
        return {
          ...state,
          ingredients: [...state.ingredients.filter((i) => i.ingredientID !== action.payload.ingredientID)]
        }
      }
  
      case SORT_ITEMS: {
        const data = [...state.ingredients];
        data.splice(action.dragIndex, 0, data.splice(action.hoverIndex, 1)[0]);
        return {
          ...state,
          ingredients: data
        }
      }
      case RESET_CART: {
        return {
            ...state,
                ingredients: [],
                cartIds: [],
                bun: {},
                isLoading: true
        }
    }
  
      default: {
        return state;
      }
    }
  };
  