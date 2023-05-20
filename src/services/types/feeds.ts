import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE
} from "../constants";

export interface IOrder {
    _id: string;
    name: string;
    number: number;
    status: string;
    ingredients: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface IFeedResponse {
    success: boolean;
    orders: Array<IOrder>;
    total: number;
    totalToday: number
}

export type TWSFeedActions = {
    wsInit: typeof WS_FEED_CONNECTION_START,
    wsSendMessage: typeof WS_FEED_SEND_MESSAGE,
    onOpen: typeof WS_FEED_CONNECTION_SUCCESS,
    onClose: typeof WS_FEED_CONNECTION_CLOSED,
    onError: typeof WS_FEED_CONNECTION_ERROR,
    onMessage: typeof WS_FEED_GET_MESSAGE,
};