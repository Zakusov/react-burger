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
    ordersUserFeed: Array<IOrder>;
    currentOrderUserFeed: IOrder | null;
};

const initialStateUserFeed: TUserFeedState = {
    wsConnectedUserFeed: false,
    isErrorUserFeed: false,
    ordersUserFeed: [],
    currentOrderUserFeed: null
}

export const userFeedReducer = (state = initialStateUserFeed, action: TUserFeedActions) => {
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
                ordersUserFeed: action.payload.orders
            };
        }
        case SET_CURRENT_WS_USER_FEED: {
            return {
                ...state,
                currentOrderUserFeed: [...state.ordersUserFeed].filter(item => item._id === action.payload)[0]
            };
        }
        case REMOVE_CURRENT_WS_USER_FEED: {
            return {...state, currentOrderUserFeed: null};
        }
        default: {
            return state
        }
    }
}
