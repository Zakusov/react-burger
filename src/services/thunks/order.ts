import {AppDispatch, AppThunkAction, SelectedIngredientType} from "../types";
import {CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS} from "../constants";
import {createOrderRequest} from "../../utils/burger-api";

export const createOrder = (bun: SelectedIngredientType, filling: Array<SelectedIngredientType>): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: CREATE_ORDER
        });
        const ingredientIds = filling.map(element => element._id);
        ingredientIds.push(bun._id);
        createOrderRequest(ingredientIds).then((res) => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: res.order.number
            });
        }).catch((e) => {
            console.log(e);
            dispatch({
                type: CREATE_ORDER_FAILED
            });
        });
    };
};