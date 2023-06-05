import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../constants";
import {IngredientType} from "../types";
import {TIngredientsActions} from "../actions";

type TIngredientsState = {
    ingredients: Array<IngredientType>;
    isLoading: boolean;
    isFailed: boolean;
};

export const initialIngredientsState: TIngredientsState = {
    ingredients: [],
    isLoading: false,
    isFailed: false
};

export const ingredientsReducer = (state: TIngredientsState = initialIngredientsState, action: TIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {...state, isLoading: true};
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, isLoading: false, isFailed: false, ingredients: [...action.ingredients]};
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, isLoading: false, isFailed: true};
        }
        default: {
            return state;
        }
    }
};