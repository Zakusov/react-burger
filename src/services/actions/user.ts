import {
    FORGOT_PASSWORD,
    GET_AUTH_FAILED,
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_REGISTER_FAILED,
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    GET_USER,
    RESET_PASSWORD,
    SIGN_OUT,
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
    readonly payload: UserType;
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
    readonly payload: UserType;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export interface IAuthRequestAction {
    readonly type: typeof GET_AUTH_REQUEST;
}

export interface IAuthSuccessAction {
    readonly type: typeof GET_AUTH_SUCCESS;
    readonly payload: UserType;
}

export interface IAuthFailedAction {
    readonly type: typeof GET_AUTH_FAILED;
    readonly payload: string;
}

export interface IGetUserAction {
    readonly type: typeof GET_USER;
    readonly payload: UserType;
}

export interface ISignOutAction {
    readonly type: typeof SIGN_OUT;
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
    | IGetUserAction
    | ISignOutAction
    | IForgotPassword
    | IResetPassword;

export const registerRequestAction = (): IRegisterRequestAction => ({
    type: GET_REGISTER_REQUEST
});
export const registerSuccessAction = (user: UserType): IRegisterSuccessAction => ({
    type: GET_REGISTER_SUCCESS,
    payload: user
});
export const registerFailedAction = (message: string): IRegisterFailedAction => ({
    type: GET_REGISTER_FAILED,
    payload: message
});

export const authRequestAction = (): IAuthRequestAction => ({
    type: GET_AUTH_REQUEST
});
export const authSuccessAction = (user: UserType): IAuthSuccessAction => ({
    type: GET_AUTH_SUCCESS,
    payload: user
});
export const authFailedAction = (message: string): IAuthFailedAction => ({
    type: GET_AUTH_FAILED,
    payload: message
});

export const getUserAction = (user: UserType): IGetUserAction => ({
    type: GET_USER,
    payload: user
});

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({
    type: UPDATE_USER_REQUEST
});
export const updateUserSuccessAction = (user: UserType): IUpdateUserSuccessAction => ({
    type: UPDATE_USER_SUCCESS,
    payload: user
});
export const updateUserFailedAction = (): IUpdateUserFailedAction => ({
    type: UPDATE_USER_FAILED
});

export const signOutAction = (): ISignOutAction => ({
    type: SIGN_OUT
});