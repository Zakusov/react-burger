import {getIngredients} from "../../utils/burger-api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function loadIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        });
        getIngredients().then((res) => {
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