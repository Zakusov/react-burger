import uuid from "react-uuid";
import {
    ADD_INGREDIENT,
    CREATE_ORDER,
    CREATE_ORDER_FAILED,
    CREATE_ORDER_SUCCESS,
    DELETE_ALL,
    DELETE_INGREDIENT,
    REPLACE_FILLING
} from "../constants";
import {IngredientType, SelectedIngredientType} from "../types";

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

export interface ICreateOrderAction {
    readonly type: typeof CREATE_ORDER;
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly payload: number;
}

export interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED;
}

export type TOrderActions =
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IDeleteAllAction
    | IReplaceFillingAction
    | ICreateOrderAction
    | ICreateOrderSuccessAction
    | ICreateOrderFailedAction;

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

