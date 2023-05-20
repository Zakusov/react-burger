import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {orderReducer} from "./order";
import {feedReducer} from "./feeds";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    feeds: feedReducer
});