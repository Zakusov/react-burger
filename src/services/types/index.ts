import {ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";

import {TIngredientsActions} from "../actions/ingredients";
import {TOrderActions} from "../actions/order";
import {store} from "../store";

export type LoginType = {
    email: string;
    password: string;
}

export type UserType = {
    name: string;
} & LoginType;

type AppActions = TIngredientsActions | TOrderActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
