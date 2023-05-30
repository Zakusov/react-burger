import {AnyAction} from "redux";
import {initialOrderState, orderReducer} from "./order";
import {
    ADD_INGREDIENT,
    CREATE_ORDER,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    DELETE_ALL,
    DELETE_INGREDIENT,
    REPLACE_FILLING
} from "../constants";

const bun = {
    "id": "1",
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}

const item1 = {
    "id": "2",
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
}

const item2 = {
    "id": "3",
    "_id": "643d69a5c3f7b9001cfa093e",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
}

describe('Order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as AnyAction)).toEqual(initialOrderState)
    })

    it('should handle ADD_INGREDIENT for bun', () => {
        expect(
            orderReducer(initialOrderState, {
                type: ADD_INGREDIENT,
                payload: bun
            })
        ).toEqual({...initialOrderState, bun: bun, filling: [], price: 2510})
    })

    it('should handle ADD_INGREDIENT for item1', () => {
        expect(
            orderReducer(initialOrderState, {
                type: ADD_INGREDIENT,
                payload: item1
            })
        ).toEqual({...initialOrderState, bun: null, filling: [item1], price: 424})
    })

    it('should handle DELETE_INGREDIENT', () => {
        expect(
            orderReducer({...initialOrderState, filling: [item1], price: 424}, {
                type: DELETE_INGREDIENT,
                payload: "2"
            })
        ).toEqual({...initialOrderState, filling: [], price: 0})
    })

    it('should handle DELETE_ALL', () => {
        expect(
            orderReducer({...initialOrderState, bun: bun, filling: [item1], price: 2934}, {
                type: DELETE_ALL
            })
        ).toEqual({...initialOrderState, bun: null, filling: [], price: 0})
    })

    it('should handle REPLACE_FILLING', () => {
        expect(
            orderReducer({...initialOrderState, filling: [item1], price: 2510}, {
                type: REPLACE_FILLING,
                payload: [item2]
            })
        ).toEqual({...initialOrderState, filling: [item2], price: 2510})
    })

    it('should handle CREATE_ORDER', () => {
        expect(
            orderReducer({...initialOrderState}, {
                type: CREATE_ORDER
            })
        ).toEqual({...initialOrderState, isSending: true})
    })

    it('should handle CREATE_ORDER_SUCCESS', () => {
        expect(
            orderReducer({...initialOrderState}, {
                type: CREATE_ORDER_SUCCESS,
                payload: 123
            })
        ).toEqual({...initialOrderState, isSending: false, orderId: 123})
    })

    it('should handle CREATE_ORDER_FAILED', () => {
        expect(
            orderReducer({...initialOrderState}, {
                type: CREATE_ORDER_FAILED
            })
        ).toEqual({...initialOrderState, isSending: false, isFailed: true})
    })
})