import type {Middleware, MiddlewareAPI} from 'redux';

import type {AppActions, AppDispatch, IFeedResponse, RootState, TWSFeedActions} from '../types';

export const socketMiddleware = (wsUrl: string, wsActions: TWSFeedActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next: AppDispatch) => (action: AppActions) => {
            const {dispatch} = store;
            const {type} = action;
            const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;
            if (type === wsInit) {
                socket = new WebSocket(wsUrl);
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