import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients-actions";

const initialState = {
    ingredients: [],
    isLoading: false,
    isFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {...state, isLoading: true};
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, isLoading: false, isFailed: false, ingredients: action.ingredients};
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, isLoading: false, isFailed: true};
        }
        default: {
            return state;
        }
    }
};