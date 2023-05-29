import {AnyAction} from "redux";
import {initialUserFeedState, userFeedReducer} from "./userFeeds";

describe('User feed reducer', () => {
    it('should return the initial state', () => {
        expect(userFeedReducer(undefined, {} as AnyAction)).toEqual(initialUserFeedState)
    })
})