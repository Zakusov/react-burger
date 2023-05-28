import {
    REMOVE_CURRENT_WS_USER_FEED,
    SET_CURRENT_WS_USER_FEED,
    WS_USER_FEED_CONNECTION_CLOSED,
    WS_USER_FEED_CONNECTION_ERROR,
    WS_USER_FEED_CONNECTION_START,
    WS_USER_FEED_CONNECTION_SUCCESS,
    WS_USER_FEED_GET_MESSAGE,
    WS_USER_FEED_SEND_MESSAGE
} from "../constants";
import {IFeedResponse} from "../types";

export interface IUserFeedConnectionStart {
    readonly type: typeof WS_USER_FEED_CONNECTION_START;
}

export interface IUserFeedConnectionSuccessAction {
    readonly type: typeof WS_USER_FEED_CONNECTION_SUCCESS;
}

export interface IUserFeedConnectionErrorAction {
    readonly type: typeof WS_USER_FEED_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IUserFeedConnectionClosedAction {
    readonly type: typeof WS_USER_FEED_CONNECTION_CLOSED;
}

export interface IUserFeedGetMessageAction {
    readonly type: typeof WS_USER_FEED_GET_MESSAGE;
    readonly payload: IFeedResponse;
}

export interface IUserFeedSendMessageAction {
    readonly type: typeof WS_USER_FEED_SEND_MESSAGE;
    readonly payload: { message: string };
}

export interface ISetCurrentUserFeedAction {
    readonly type: typeof SET_CURRENT_WS_USER_FEED;
    readonly payload: string;
}

export interface IRemoveCurrentUserFeedAction {
    readonly type: typeof REMOVE_CURRENT_WS_USER_FEED;
}

export type TUserFeedActions =
    | IUserFeedConnectionStart
    | IUserFeedConnectionSuccessAction
    | IUserFeedConnectionErrorAction
    | IUserFeedConnectionClosedAction
    | IUserFeedGetMessageAction
    | IUserFeedSendMessageAction
    | ISetCurrentUserFeedAction
    | IRemoveCurrentUserFeedAction;