import {AppDispatch, AppThunkAction} from "../types";
import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../constants";
import {getIngredientsRequest} from "../../utils/burger-api";

export const loadIngredients = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: GET_INGREDIENTS
        });
        getIngredientsRequest().then((res) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data
            });
        }).catch((e) => {
            console.log(e);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        });
    };
}