import {AnyAction} from "redux";
import {initialOrderState, orderReducer} from "./order";

describe('Order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as AnyAction)).toEqual(initialOrderState)
    })
})