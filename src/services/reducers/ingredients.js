import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    loadingStarted: false,
    loadingFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {...state, loadingStarted: true};
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, loadingStarted: false, loadingFailed: false, ingredients: action.ingredients};
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, loadingStarted: false, loadingFailed: true};
        }
        default: {
            return state;
        }
    }
};