import { OPEN_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT, SELECT_INGREDIENT } from "../actions/ingredient-detail"

const initialState = {
   isOpened: false,
   idIngredients: '',
   selectedIngredient: {},
}

export const objectIngredient = (state = initialState, action) => {

   switch (action.type) {
      case OPEN_MODAL_INGREDIENT:
         return {
            ...state,
            isOpened: true,
            idIngredients: action.idIngredients
         }
         case CLOSE_MODAL_INGREDIENT: 
            return {
               ...state,
               isOpened: false,
               idIngredients: ''
            }
            case SELECT_INGREDIENT: {
               return {
                   ...state,
                   isOpened: true,
                       selectedIngredient: action.idIngredients
               };
           }

      default:
         return state
   }
}