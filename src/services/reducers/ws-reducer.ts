import { IFeedWSMessage, IUserWSMessage } from "../../utils/types";
import { TWSActions } from "../actions/ws-actions";
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/ws-action-types";

type TWSState = {
  wsConnected: boolean;
  feedMessages: Array<IFeedWSMessage>;
  error: boolean;
};

const initialState: TWSState = {
  wsConnected: false,
  feedMessages: [],
  error: false
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: false,
        wsConnected: true
      };
    }
    case WS_FEED_CONNECTION_ERROR: {
      return {
        ...state,
        error: true,
        wsConnected: false
      };
    }
    case WS_FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        error: false,
        wsConnected: false,
        feedMessages: []
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        error: false,
        feedMessages: [...state.feedMessages, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}