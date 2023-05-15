import {getIngredientsRequest} from "../../utils/burger-api";
import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../constants/ingredients";

export function loadIngredients() {
    return function (dispatch) {
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