import {AnyAction} from "redux";
import {initialUserState, userReducer} from "./user";

describe('User reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {} as AnyAction)).toEqual(initialUserState)
    })
})