import {AnyAction} from "redux";
import {ingredientsReducer, initialIngredientsState} from "./ingredients";

describe('Ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as AnyAction)).toEqual(initialIngredientsState)
    })
})