import {
    REMOVE_CURRENT_WS_USER_FEED,
    SET_CURRENT_WS_USER_FEED,
    WS_USER_FEED_CONNECTION_CLOSED,
    WS_USER_FEED_CONNECTION_ERROR,
    WS_USER_FEED_CONNECTION_SUCCESS,
    WS_USER_FEED_GET_MESSAGE
} from "../constants";
import {IOrder} from "../types";
import {TUserFeedActions} from "../actions";

type TUserFeedState = {
    wsConnectedUserFeed: boolean;
    isErrorUserFeed: boolean;
    orders: Array<IOrder>;
    currentOrder: IOrder | null;
};

export const initialUserFeedState: TUserFeedState = {
    wsConnectedUserFeed: false,
    isErrorUserFeed: false,
    orders: [],
    currentOrder: null
}

export const userFeedReducer = (state = initialUserFeedState, action: TUserFeedActions) => {
    switch (action.type) {
        case WS_USER_FEED_CONNECTION_SUCCESS: {
            return {...state, wsConnectedUserFeed: true, isErrorUserFeed: false};
        }
        case WS_USER_FEED_CONNECTION_ERROR: {
            return {...state, wsConnectedUserFeed: false, isErrorUserFeed: true};
        }
        case WS_USER_FEED_CONNECTION_CLOSED: {
            return {...state, wsConnectedUserFeed: false, isErrorUserFeed: false};
        }
        case WS_USER_FEED_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload.orders
            };
        }
        case SET_CURRENT_WS_USER_FEED: {
            return {
                ...state,
                currentOrder: [...state.orders].filter(item => item._id === action.payload)[0]
            };
        }
        case REMOVE_CURRENT_WS_USER_FEED: {
            return {...state, currentOrder: null};
        }
        default: {
            return state
        }
    }
}
