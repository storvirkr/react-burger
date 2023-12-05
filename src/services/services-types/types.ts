import { store } from "../ws-store";
import { TAuthActions } from "../actions/auth";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TBurgerIngredientsActions } from "../actions/ingredients";
import { TModalActions } from "../actions/modal";
import { TWSActions } from '../actions/ws-actions';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator, AnyAction, Dispatch } from "redux";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TAuthActions 
| TBurgerConstructorActions 
| TBurgerIngredientsActions  
| TModalActions
| TWSActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
export type AppDispatch = Dispatch<TApplicationActions> | AppThunk;

export type AppDispatchActions = Dispatch<TApplicationActions>;