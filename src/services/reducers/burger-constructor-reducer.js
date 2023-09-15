import {
    ADD_ITEM_TO_CONSTRUCTOR,
    DELETE_ITEM_FROM_CONSTRUCTOR,
    SORT_ITEMS
  } from '../actions/burger-constructor'
  import {v4 as uuidv4} from 'uuid';
  
  const initialState = {
    bun: [],
    ingredients: [],
  };
  
  export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM_TO_CONSTRUCTOR: {
        const ingredientID = {ingredientID: uuidv4()};
        if (action.payload.type === 'bun') {
          return {
            ...state,
            bun: action.payload
          }
        } else {
          return {
            ...state,
            ingredients: [...state.ingredients, {...action.payload, ...ingredientID}],
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
  
      default: {
        return state;
      }
    }
  };
  