import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  RECOVERY_REQUEST,
  RECOVERY_FAILED,
  RECOVERY_SUCCESS,
  SIGN_IN_USER,
  SIGN_OUT_USER, 
  SET_USER
} from "../actions/auth";

const initialState = {
  isAuth: false,
  authFailed: false,

  isForgot: false,
  recoveryRequest: false,
  recoverIsFailed: false,

  user: { }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case SIGN_IN_USER: {
          return {
              ...state,
              isAuth: true,
              authFailed: false,
              user: {
                  ...action.payload
              }
          };
      }
      case SIGN_OUT_USER: {
          return {
              ...state,
              isAuth: false,
              authFailed: false,
          };
      }
      case REGISTER_USER_SUCCESS: {
          return {
              ...state,
              isAuth: true,
              authFailed: false
          };
      }
      case REGISTER_USER_FAILED: {
          return {
              ...state,
              authFailed: true
          };
      }
      case RECOVERY_REQUEST: {
          return {
              ...state,
              isForgot: true
          };
      }
      case RECOVERY_SUCCESS: {
          return {
              ...state,
              recoveryRequest: true,
              recoverIsFailed: false
          };
      }
      case RECOVERY_FAILED: {
          return {
              ...state,
              recoverIsFailed: true
          };
      }
      case SET_USER: {
          return {
              ...state,
              isAuth: true,
              user: {
                  ...action.payload.user
              }
          }
      }
      default: {
          return state;
      }
  }
};