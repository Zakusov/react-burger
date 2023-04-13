import uuid from "react-uuid";
import {createOrderRequest} from "../../utils/burger-api";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const DELETE_ALL = "DELETE_ALL";
export const REPLACE_FILLING = "REPLACE_FILLING";
export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: {...ingredient, id: uuid()}
});

export const deleteIngredient = (id) => ({
    type: DELETE_INGREDIENT,
    payload: id
});

export const deleteAll = () => ({
    type: DELETE_ALL
});

export const replaceFilling = (filling) => ({
    type: REPLACE_FILLING,
    payload: filling
});

export const createOrder = (bun, filling) => function (dispatch) {
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
