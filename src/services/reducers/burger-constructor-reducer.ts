import { TItem, TItemEmpty } from "../../utils/types";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import {
    ADD_TO_CART,
    SET_CART,
    REMOVE_FROM_CART,
    RESET_CART,
    ADD_BUN
} from "../constants/constructor-types";

type TBurgerConstructorState = {
    ingredients: Array<TItem>;
    bun: TItem | TItemEmpty;
    isLoading: boolean;
}

const initialState: TBurgerConstructorState = {
    ingredients: [],
    bun: {},
    isLoading: true
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
    switch (action.type) {
        case ADD_TO_CART: {
            return {
              ...state,
              ingredients: [...state.ingredients, action.payload],
              isLoading: false
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload,
                isLoading: false
            } 
        }
        case SET_CART: {
            return {
                ...state,
                ingredients: action.payload
            }
        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                ingredients: state.ingredients.filter((item, index) => index !== action.payload)
            } 
        }
        case RESET_CART: {
            return {
                ...state,
                ingredients: [],
                    bun: {},
                    isLoading: true
            }
        }
        default: {
            return state;
        }
    }
}