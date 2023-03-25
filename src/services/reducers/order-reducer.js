import uuid from 'react-uuid';
import {ADD_INGREDIENT, DELETE_INGREDIENT} from "../actions/order-actions";

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
            const id = uuid();
            const ingredient = {...action.ingredient, id};
            if (ingredient.type === 'bun') {
                return {
                    ...state,
                    bun: ingredient,
                    price: calculatePrice(ingredient, state.filling)
                }
            }
            return {
                ...state,
                filling: [...state.filling, ingredient],
                price: calculatePrice(state.bun, state.filling, ingredient)
            }
        }
        case DELETE_INGREDIENT: {
            const filling = [...state.filling.filter(item => item.id !== action.id)];
            return {
                ...state,
                filling: filling,
                cost: calculatePrice(state.bun, filling)
            }
        }
        default: {
            return state;
        }
    }
};