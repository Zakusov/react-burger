import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {rootReducer} from './reducers';
import {socketMiddleware} from "./middleware";
import {FEED_URL, USER_FEED_URL} from "../utils/constants";
import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE,
    WS_USER_FEED_CONNECTION_CLOSED,
    WS_USER_FEED_CONNECTION_ERROR,
    WS_USER_FEED_CONNECTION_START,
    WS_USER_FEED_CONNECTION_SUCCESS,
    WS_USER_FEED_GET_MESSAGE,
    WS_USER_FEED_SEND_MESSAGE,
} from "./constants";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsFeedActions = {
    wsInit: WS_FEED_CONNECTION_START,
    onOpen: WS_FEED_CONNECTION_SUCCESS,
    onError: WS_FEED_CONNECTION_ERROR,
    onMessage: WS_FEED_GET_MESSAGE,
    wsSendMessage: WS_FEED_SEND_MESSAGE,
    onClose: WS_FEED_CONNECTION_CLOSED
};

const wsUserFeedActions = {
    wsInit: WS_USER_FEED_CONNECTION_START,
    onOpen: WS_USER_FEED_CONNECTION_SUCCESS,
    onError: WS_USER_FEED_CONNECTION_ERROR,
    onMessage: WS_USER_FEED_GET_MESSAGE,
    wsSendMessage: WS_USER_FEED_SEND_MESSAGE,
    onClose: WS_USER_FEED_CONNECTION_CLOSED
};

const middleware = applyMiddleware(
    thunkMiddleware,
    socketMiddleware(`${FEED_URL}`, wsFeedActions),
    socketMiddleware(`${USER_FEED_URL}`, wsUserFeedActions)
);

export const store = createStore(rootReducer, composeEnhancers(middleware));