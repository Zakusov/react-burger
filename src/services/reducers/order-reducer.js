import {
    ADD_INGREDIENT,
    CREATE_ORDER,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    DELETE_ALL,
    DELETE_INGREDIENT,
    REPLACE_FILLING
} from "../actions/order-actions";

const initialState = {
    bun: null,
    filling: [],
    price: 0,
    isSending: false,
    isFailed: false,
    orderId: null
};

function getPrice(ingredient) {
    return ingredient ? ingredient.price : 0;
}

function calculatePrice(bun, filling, ingredient) {
    return getPrice(bun) * 2 + filling?.reduce((acc, obj) => acc + getPrice(obj), 0) + getPrice(ingredient);
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload,
                    price: calculatePrice(action.payload, state.filling)
                };
            }
            return {
                ...state,
                filling: [...state.filling, action.payload],
                price: calculatePrice(state.bun, state.filling, action.payload)
            };
        }
        case DELETE_INGREDIENT: {
            const filling = [...state.filling.filter(item => item.id !== action.payload)];
            return {
                ...state,
                filling: filling,
                cost: calculatePrice(state.bun, filling)
            };
        }
        case DELETE_ALL: {
            return {...initialState};
        }
        case REPLACE_FILLING: {
            return {
                ...state,
                filling: [
                    ...action.payload
                ]
            }
        }
        case CREATE_ORDER: {
            return {
                ...state,
                isSending: true
            }
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                isSending: false,
                orderId: action.payload
            }
        }
        case CREATE_ORDER_FAILED: {
            return {
                ...state,
                isSending: false,
                isFailed: true
            }
        }
        default: {
            return state;
        }
    }
};