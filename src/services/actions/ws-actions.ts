import { IFeedWSMessage } from '../../utils/types';
import {
  WS_FEED_CONNECTION_CLOSE,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from '../constants/ws-action-types'

interface IWSFeedConnectionStart {
  readonly type: typeof WS_FEED_CONNECTION_START;
  readonly payload: string;
}

interface IWSFeedConnectionClose {
  readonly type: typeof WS_FEED_CONNECTION_CLOSE;
}

interface IWSFeedConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

interface IWSFeedConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

interface IWSFeedConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IFeedWSMessage;
}

export type TWSActions = 
  | IWSFeedConnectionStart
  | IWSFeedConnectionClose
  | IWSFeedConnectionSuccess
  | IWSFeedConnectionError
  | IWSFeedConnectionClosed
  | IWSGetMessage;

export const wsFeedInit = (url: string): IWSFeedConnectionStart => {
  return {
    type: WS_FEED_CONNECTION_START,
    payload: url
  };
}

export const wsFeedClose = (): IWSFeedConnectionClose => {
  return {
    type: WS_FEED_CONNECTION_CLOSE
  };
}

export const wsFeedSuccess = (): IWSFeedConnectionSuccess => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS
  };
}

export const wsFeedError = (): IWSFeedConnectionError => {
  return {
    type: WS_FEED_CONNECTION_ERROR
  };
}

export const wsFeedClosed = (): IWSFeedConnectionClosed => {
  return {
    type: WS_FEED_CONNECTION_CLOSED
  };
}

export const wsGetMessage = (message: IFeedWSMessage): IWSGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
}

