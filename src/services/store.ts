import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {rootReducer} from './reducers';
import {socketMiddleware} from "./middleware";
import {FEED_URL} from "../utils/constants";
import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE
} from "./constants";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsFeedActions = {
    wsInit: WS_FEED_CONNECTION_START,
    wsSendMessage: WS_FEED_SEND_MESSAGE,
    onOpen: WS_FEED_CONNECTION_SUCCESS,
    onClose: WS_FEED_CONNECTION_CLOSED,
    onError: WS_FEED_CONNECTION_ERROR,
    onMessage: WS_FEED_GET_MESSAGE
};

const middleware = applyMiddleware(thunkMiddleware, socketMiddleware(`${FEED_URL}`, wsFeedActions));

export const store = createStore(rootReducer, composeEnhancers(middleware));