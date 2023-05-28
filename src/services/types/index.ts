import {ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";

import {TFeedActions, TIngredientsActions, TOrderActions, TUserActions, TUserFeedActions} from "../actions";
import {store} from "../store";

export * from './data';
export * from './feeds';
export * from './user';

export type LoginType = {
    email: string;
    password: string;
}

export type UserType = {
    name: string;
} & LoginType;

export type AppActions = TIngredientsActions | TOrderActions | TFeedActions | TUserActions | TUserFeedActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
