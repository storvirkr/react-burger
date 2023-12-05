import { TItem } from "../../utils/types";
import { TBurgerIngredientsActions } from "../actions/ingredients";
import {
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../constants/ingredients-types";

type TBurgerIngredientsState = {
    ingredients: Array<TItem>;
    isLoading: boolean;
    isFailed: boolean;
}

const initialState: TBurgerIngredientsState = {
    ingredients: [],
    isLoading: false,
    isFailed: false
};

export const burgerIngredientReducer = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientsState => {
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