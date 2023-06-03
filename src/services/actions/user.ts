import {
    FORGOT_PASSWORD,
    GET_AUTH_FAILED,
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_REGISTER_FAILED,
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    LOG_IN,
    LOG_OUT,
    RESET_PASSWORD,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "../constants";
import {UserType} from "../types";

export interface IRegisterRequestAction {
    readonly type: typeof GET_REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof GET_REGISTER_SUCCESS;
}

export interface IRegisterFailedAction {
    readonly type: typeof GET_REGISTER_FAILED;
    readonly payload: string
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
    readonly payload: string
}

export interface IAuthRequestAction {
    readonly type: typeof GET_AUTH_REQUEST;
}

export interface IAuthSuccessAction {
    readonly type: typeof GET_AUTH_SUCCESS;
}

export interface IAuthFailedAction {
    readonly type: typeof GET_AUTH_FAILED;
    readonly payload: string;
}

export interface ILogInAction {
    readonly type: typeof LOG_IN;
    readonly payload: UserType;
}

export interface ILogOutAction {
    readonly type: typeof LOG_OUT;
}

export interface IForgotPassword {
    readonly type: typeof FORGOT_PASSWORD;
}

export interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
}

export type TUserActions =
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | IAuthFailedAction
    | IAuthRequestAction
    | IAuthSuccessAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | ILogInAction
    | ILogOutAction
    | IForgotPassword
    | IResetPassword;

export const registerRequestAction = (): IRegisterRequestAction => ({
    type: GET_REGISTER_REQUEST
});
export const registerSuccessAction = (): IRegisterSuccessAction => ({
    type: GET_REGISTER_SUCCESS
});
export const registerFailedAction = (message: string): IRegisterFailedAction => ({
    type: GET_REGISTER_FAILED,
    payload: message
});

export const authRequestAction = (): IAuthRequestAction => ({
    type: GET_AUTH_REQUEST
});
export const authSuccessAction = (): IAuthSuccessAction => ({
    type: GET_AUTH_SUCCESS
});
export const authFailedAction = (message: string): IAuthFailedAction => ({
    type: GET_AUTH_FAILED,
    payload: message
});

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({
    type: UPDATE_USER_REQUEST
});
export const updateUserSuccessAction = (): IUpdateUserSuccessAction => ({
    type: UPDATE_USER_SUCCESS
});
export const updateUserFailedAction = (message: string): IUpdateUserFailedAction => ({
    type: UPDATE_USER_FAILED,
    payload: message
});

export const signInAction = (user: UserType): ILogInAction => ({
    type: LOG_IN,
    payload: user
});
export const signOutAction = (): ILogOutAction => ({
    type: LOG_OUT
});