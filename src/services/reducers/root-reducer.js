import { combineReducers } from "redux";
import { burgerIngredientReducer } from "./ingredients-reducer";
import { orderReducer } from "./burger-order";
import { burgerConstructorReducer } from "./burger-constructor-reducer";
import { objectIngredient } from "./ingredient-detail-reducer";
import { registerReducer } from "./register";
import { loginReducer } from "./login";
import { authReducer } from "./auth";


export const rootReducer = combineReducers({
   burgerIngredientReducer,
   orderReducer,
   burgerConstructorReducer,
   objectIngredient,
   registerReducer,
   loginReducer,
   authReducer,
   
})