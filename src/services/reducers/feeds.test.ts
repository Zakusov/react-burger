import {AnyAction} from "redux";
import {feedReducer, initialFeedState} from "./feeds";
import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE
} from "../constants";

describe('Feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {} as AnyAction)).toEqual(initialFeedState)
    })

    it('should handle WS_FEED_CONNECTION_SUCCESS', () => {
        expect(
            feedReducer(initialFeedState, {
                type: WS_FEED_CONNECTION_SUCCESS
            })
        ).toEqual({...initialFeedState, wsConnected: true, isError: false})
    })

    it('should handle WS_FEED_CONNECTION_ERROR', () => {
        expect(
            feedReducer(initialFeedState, {
                type: WS_FEED_CONNECTION_ERROR
            })
        ).toEqual({...initialFeedState, wsConnected: false, isError: true})
    })

    it('should handle WS_FEED_CONNECTION_CLOSED', () => {
        expect(
            feedReducer(initialFeedState, {
                type: WS_FEED_CONNECTION_CLOSED
            })
        ).toEqual({...initialFeedState, wsConnected: false, isError: false})
    })

    it('should handle WS_FEED_GET_MESSAGE', () => {
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
        expect(
            feedReducer(initialFeedState, {
                type: WS_FEED_GET_MESSAGE,
                payload: feedResponse
            })
        ).toEqual({
            ...initialFeedState,
            orders: [pendingBurger, doneBurger],
            ordersDone: [null, 6026],
            ordersPending: [6027, null],
            ordersTotal: 5653,
            totalToday: 2,
        })
    })
})