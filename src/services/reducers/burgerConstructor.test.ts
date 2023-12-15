import { burgerConstructorReducer as reducer } from "./burger-constructor-reducer";
import * as types from '../constants/constructor-types';
import { bunIngredientMock, ingredientMock } from "../../utils/mocks";

const initialState = {
  ingredients: [],
  bun: {},
  isLoading: true
};

describe('burgerConstructorReducer reducer', () => {
  it('should return the initial state', () => {
    //@ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle ADD_TO_CART', () => {
    expect(
      reducer(initialState, { type: types.ADD_TO_CART, payload: ingredientMock })
    ).toEqual({
      ...initialState,
      ingredients: [ingredientMock],
      isLoading: false
    });
  });
  it('should handle ADD_BUN', () => {
    expect(
      reducer(initialState, { type: types.ADD_BUN, payload: bunIngredientMock })
    ).toEqual({
      ...initialState,
      bun: bunIngredientMock,
      isLoading: false
    });
  });
 
  it('should handle SET_CART', () => {
    expect(
      reducer(initialState, { type: types.SET_CART, payload: [ingredientMock] })
    ).toEqual({
      ...initialState,
      ingredients: [ingredientMock]
    });
  });
  
  it('should handle REMOVE_FROM_CART', () => {
    expect(
      //@ts-ignore
      reducer(initialState, { type: types.REMOVE_FROM_CART, payload: ingredientMock })
    ).toEqual({
      ...initialState,
      ingredients: []
    });
  });
  
  it('should handle RESET_CART', () => {
    expect(
      reducer(initialState, { type: types.RESET_CART })
    ).toEqual({
      ...initialState,
      ingredients: [],
      bun: {},
      isLoading: true
    });
  });
});