import {getIngredientsRequest} from "../../utils/burger-api";
import {GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../constants/ingredients";
import {IngredientType} from "../types/data";
import {AppDispatch, AppThunkAction} from "../types";

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: Array<IngredientType>;
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
    | IGetIngredientsAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;

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