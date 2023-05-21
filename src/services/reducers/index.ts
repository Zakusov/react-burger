import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {orderReducer} from "./order";
import {feedReducer} from "./feeds";
import {userReducer} from "./user";
import {userFeedReducer} from "./userFeeds";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    feeds: feedReducer,
    user: userReducer,
    userFeeds: userFeedReducer
});