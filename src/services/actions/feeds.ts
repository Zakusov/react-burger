import {
    REMOVE_CURRENT_WS_FEED,
    SET_CURRENT_WS_FEED,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE
} from "../constants";
import {IFeedResponse} from "../types";

export interface IFeedConnectionStart {
    readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IFeedConnectionSuccessAction {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionErrorAction {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

export interface IFeedConnectionClosedAction {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IFeedGetMessageAction {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly payload: IFeedResponse;
}

export interface IFeedSendMessageAction {
    readonly type: typeof WS_FEED_SEND_MESSAGE;
    readonly payload: { message: string };
}

export interface ISetCurrentFeedAction {
    readonly type: typeof SET_CURRENT_WS_FEED;
    readonly payload: string;
}

export interface IRemoveCurrentFeedAction {
    readonly type: typeof REMOVE_CURRENT_WS_FEED;
}

export type TFeedActions =
    | IFeedConnectionStart
    | IFeedConnectionSuccessAction
    | IFeedConnectionErrorAction
    | IFeedConnectionClosedAction
    | IFeedGetMessageAction
    | IFeedSendMessageAction
    | ISetCurrentFeedAction
    | IRemoveCurrentFeedAction;