import uuid from "react-uuid";
import {createOrderRequest} from "../../utils/burger-api";
import {
    ADD_INGREDIENT,
    CREATE_ORDER,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    DELETE_ALL,
    DELETE_INGREDIENT,
    REPLACE_FILLING
} from "../constants/order";
import {IngredientType, SelectedIngredientType} from "../types/data";

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: SelectedIngredientType;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: string;
}

export interface IDeleteAllAction {
    readonly type: typeof DELETE_ALL;
}

export interface IReplaceFillingAction {
    readonly type: typeof REPLACE_FILLING;
    readonly payload: Array<SelectedIngredientType>;
}

export const addIngredient = (ingredient: IngredientType): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    payload: {...ingredient, id: uuid()}
});

export const deleteIngredient = (id: string): IDeleteIngredientAction => ({
    type: DELETE_INGREDIENT,
    payload: id
});

export const deleteAll = (): IDeleteAllAction => ({
    type: DELETE_ALL
});

export const replaceFilling = (filling: Array<SelectedIngredientType>): IReplaceFillingAction => ({
    type: REPLACE_FILLING,
    payload: filling
});

// @ts-ignore
export const createOrder = (bun: SelectedIngredientType, filling: Array<SelectedIngredientType>) => function (dispatch) {
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
