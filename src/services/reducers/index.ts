import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {orderReducer} from "./order";
import {feedReducer} from "./feeds";
import {userFeedReducer} from "./userFeeds";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    feeds: feedReducer,
    userFeeds: userFeedReducer
});