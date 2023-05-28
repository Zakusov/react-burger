import type {Middleware, MiddlewareAPI} from 'redux';

import type {AppActions, AppDispatch, IFeedResponse, RootState, TWSFeedActions} from '../types';
import {TWSUserFeedActions} from "../types";
import {getCookie} from "../../utils/cookie";
import {ACCESS_TOKEN} from "../../utils/constants";

export const socketMiddleware = (wsUrl: string, wsActions: TWSFeedActions | TWSUserFeedActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next: AppDispatch) => (action: AppActions) => {
            const {dispatch} = store;
            const {type} = action;
            const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;

            const accessToken = getCookie(ACCESS_TOKEN);
            if (type === wsInit) {
                if (accessToken) {
                    socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
                } else {
                    socket = new WebSocket(`${wsUrl}`);
                }
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: onError, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData: IFeedResponse = JSON.parse(data);
                    dispatch({type: onMessage, payload: parsedData});
                };

                socket.onclose = event => {
                    dispatch({type: onClose, payload: event});
                };

                if (type === wsSendMessage) {
                    const payload = action.payload;
                    const message = {...payload};
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};