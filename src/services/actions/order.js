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
