import {ADD_INGREDIENT, DELETE_ALL, DELETE_INGREDIENT, REPLACE_FILLING} from "../actions/order-actions";

const initialState = {
    bun: null,
    filling: [],
    price: 0
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
            if (action.ingredient.type === 'bun') {
                return {
                    ...state,
                    bun: action.ingredient,
                    price: calculatePrice(action.ingredient, state.filling)
                };
            }
            return {
                ...state,
                filling: [...state.filling, action.ingredient],
                price: calculatePrice(state.bun, state.filling, action.ingredient)
            };
        }
        case DELETE_INGREDIENT: {
            const filling = [...state.filling.filter(item => item.id !== action.id)];
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
                    ...action.filling
                ]
            }
        }
        default: {
            return state;
        }
    }
};