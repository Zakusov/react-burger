import {AnyAction} from "redux";
import {initialUserFeedState, userFeedReducer} from "./userFeeds";
import {
    REMOVE_CURRENT_WS_USER_FEED,
    SET_CURRENT_WS_USER_FEED,
    WS_USER_FEED_CONNECTION_CLOSED,
    WS_USER_FEED_CONNECTION_ERROR,
    WS_USER_FEED_CONNECTION_SUCCESS,
    WS_USER_FEED_GET_MESSAGE
} from "../constants";

const pendingBurger = {
    "_id": "6474fa088a4b62001c84d051",
    "ingredients": ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c"],
    "status": "pending",
    "name": "Био-марсианский люминесцентный краторный бургер",
    "createdAt": "2023-05-29T19:16:24.637Z",
    "updatedAt": "2023-05-29T19:16:24.817Z",
    "number": 6027
};

const doneBurger = {
    "_id": "6474ee828a4b62001c84d02a",
    "ingredients": ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0946", "643d69a5c3f7b9001cfa093c"],
    "status": "done",
    "name": "Минеральный краторный бургер",
    "createdAt": "2023-05-29T18:27:14.693Z",
    "updatedAt": "2023-05-29T18:27:14.761Z",
    "number": 6026
};

const feedResponse = {
    "success": true,
    "orders": [pendingBurger, doneBurger],
    "total": 5653,
    "totalToday": 2
}

describe('User feed reducer', () => {
    it('should return the initial state', () => {
        expect(userFeedReducer(undefined, {} as AnyAction)).toEqual(initialUserFeedState)
    })

    it('should handle WS_USER_FEED_CONNECTION_SUCCESS', () => {
        expect(
            userFeedReducer({...initialUserFeedState}, {
                type: WS_USER_FEED_CONNECTION_SUCCESS
            })
        ).toEqual({
            ...initialUserFeedState,
            wsConnectedUserFeed: true,
            isErrorUserFeed: false
        })
    })

    it('should handle WS_USER_FEED_CONNECTION_ERROR', () => {
        expect(
            userFeedReducer({...initialUserFeedState}, {
                type: WS_USER_FEED_CONNECTION_ERROR
            })
        ).toEqual({
            ...initialUserFeedState,
            wsConnectedUserFeed: false,
            isErrorUserFeed: true
        })
    })

    it('should handle WS_USER_FEED_CONNECTION_CLOSED', () => {
        expect(
            userFeedReducer({...initialUserFeedState}, {
                type: WS_USER_FEED_CONNECTION_CLOSED
            })
        ).toEqual({
            ...initialUserFeedState,
            wsConnectedUserFeed: false,
            isErrorUserFeed: false
        })
    })

    it('should handle WS_USER_FEED_GET_MESSAGE', () => {
        expect(
            userFeedReducer(initialUserFeedState, {
                type: WS_USER_FEED_GET_MESSAGE,
                payload: feedResponse
            })
        ).toEqual({
            ...initialUserFeedState,
            orders: [pendingBurger, doneBurger]
        })
    })

    it('should handle SET_CURRENT_WS_USER_FEED', () => {
        const state = {...initialUserFeedState, orders: [pendingBurger, doneBurger]};
        expect(
            userFeedReducer(state, {
                type: SET_CURRENT_WS_USER_FEED,
                payload: "6474fa088a4b62001c84d051"
            })
        ).toEqual({...state, currentOrder: pendingBurger})
    })

    it('should handle REMOVE_CURRENT_WS_USER_FEED', () => {
        expect(
            userFeedReducer({...initialUserFeedState, currentOrder: pendingBurger}, {
                type: REMOVE_CURRENT_WS_USER_FEED
            })
        ).toEqual({...initialUserFeedState, currentOrder: null})
    })
})