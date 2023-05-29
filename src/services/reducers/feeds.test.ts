import {feedReducer, initialFeedState} from "./feeds";
import {AnyAction} from "redux";

describe('Feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {} as AnyAction)).toEqual(initialFeedState)
    })
})