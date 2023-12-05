
import { TItem } from '../../utils/types';
import { URL, checkResponse } from '../../utils/api-request';
import {
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from '../constants/ingredients-types';
import { AppThunk } from '../../services/services-types/types';
import { TIngredientsResponse } from '../services-types/data';

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: Array<TItem>;
};

export interface IGetIngredientsError {
    readonly type: typeof GET_INGREDIENTS_ERROR;
};

export type TBurgerIngredientsActions = 
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsError;

export const getIngredientsRequest = (): IGetIngredientsRequest => {
    return {
        type: GET_INGREDIENTS_REQUEST
    }
};

export const getIngredientsSuccess = (data: TIngredientsResponse): IGetIngredientsSuccess => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
    }
};

export const getIngredientsError = (): IGetIngredientsError => {
    return {
        type: GET_INGREDIENTS_ERROR,
    }
};

export const getIngredients: AppThunk = () => (dispatch) => {
    dispatch(getIngredientsRequest());

    fetch(`${URL}/ingredients`)
        .then(checkResponse)
        .then((data) => {
            //@ts-ignore
            dispatch(getIngredientsSuccess(data))
        })
        .catch(e => {
            dispatch(getIngredientsError())
            console.log(`Что-то пошло не так ${e}`);
        })
}