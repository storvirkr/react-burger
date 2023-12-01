import { combineReducers } from "redux";
import { burgerIngredientReducer } from "./ingredients-reducer";
import { burgerConstructorReducer } from "./burger-constructor-reducer";
import {modalReducer} from "./modal-reducer";
import { authReducer } from "./auth";
import { wsReducer } from "./ws-reducer";


export const rootReducer = combineReducers({
   burgerIngredientReducer,
   burgerConstructorReducer,
   authReducer,
   modalReducer,
   webSocket: wsReducer,
})