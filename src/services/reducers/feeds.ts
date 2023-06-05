import {
    REMOVE_CURRENT_WS_FEED,
    SET_CURRENT_WS_FEED,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE
} from "../constants";
import {IOrder} from "../types";
import {TFeedActions} from "../actions";

type TFeedState = {
  wsConnected: boolean;
  isError: boolean;
  orders: Array<IOrder>;
  ordersTotal: number;
  totalToday: number;
  currentOrder: IOrder | null;
  ordersDone: Array<number>;
  ordersPending: Array<number>;
};

export const initialFeedState: TFeedState = {
    wsConnected: false,
    isError: false,
    orders: [],
    ordersTotal: 0,
    totalToday: 0,
    currentOrder: null,
    ordersDone: [],
    ordersPending: []
}

export const feedReducer = (state: TFeedState = initialFeedState, action: TFeedActions) => {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS: {
            return {...state, wsConnected: true, isError: false};
        }
        case WS_FEED_CONNECTION_ERROR: {
            return {...state, wsConnected: false, isError: true};
        }
        case WS_FEED_CONNECTION_CLOSED: {
            return {...state, wsConnected: false, isError: false};
        }
        case WS_FEED_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload.orders,
                ordersDone: action.payload.orders.map(item => item.status === 'done' ? item.number : null),
                ordersPending: action.payload.orders.map(item => item.status === 'pending' ? item.number : null),
                ordersTotal: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        }
        case SET_CURRENT_WS_FEED: {
            return {...state, currentOrder: state.orders.filter(item => item._id === action.payload)[0]};
        }
        case REMOVE_CURRENT_WS_FEED: {
            return {...state, currentOrder: null};
        }
        default: {
            return state
        }
    }
}
