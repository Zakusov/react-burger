import {
    ADD_INGREDIENT,
    CREATE_ORDER,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    DELETE_ALL,
    DELETE_INGREDIENT,
    REPLACE_FILLING
} from "../constants/order";
import {SelectedIngredientType} from "../types/data";
import {TOrderActions} from "../actions/order";

type TOrderState = {
    bun: SelectedIngredientType | null;
    filling: Array<SelectedIngredientType>;
    price: number;
    isSending: boolean;
    isFailed: boolean;
    orderId: number | null;
};

const initialState: TOrderState = {
    bun: null,
    filling: [],
    price: 0,
    isSending: false,
    isFailed: false,
    orderId: null
};

function getPrice(ingredient?: SelectedIngredientType | null) {
    return ingredient ? ingredient.price : 0;
}

function calculatePrice(bun: SelectedIngredientType | null, filling: Array<SelectedIngredientType>, ingredient?: SelectedIngredientType) {
    return getPrice(bun) * 2 + filling?.reduce((acc, obj) => acc + getPrice(obj), 0) + getPrice(ingredient);
}

export const orderReducer = (state: TOrderState = initialState, action: TOrderActions) => {
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
            return {...state, filling: [...action.payload]};
        }
        case CREATE_ORDER: {
            return {...state, isSending: true};
        }
        case CREATE_ORDER_SUCCESS: {
            return {...state, isSending: false, orderId: action.payload};
        }
        case CREATE_ORDER_FAILED: {
            return {...state, isSending: false, isFailed: true};
        }
        default: {
            return state;
        }
    }
};