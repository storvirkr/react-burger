import { OPEN_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT } from "../actions/ingredient-detail"

const initialState = {
   isOpened: false,
   idIngredients: ''
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

      default:
         return state
   }
}