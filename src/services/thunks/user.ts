// Авторизация
import {AppDispatch, AppThunkAction, LoginType, UserType} from "../types";
import {
    authFailedAction,
    authRequestAction,
    authSuccessAction,
    getUserAction,
    registerFailedAction,
    registerRequestAction,
    registerSuccessAction,
    signOutAction,
    updateUserFailedAction,
    updateUserRequestAction,
    updateUserSuccessAction
} from "../actions";
import {setCookie} from "../../utils/cookie";
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    recoverPasswordRequest,
    registerRequest,
    resetPasswordRequest,
    updateTokenRequest,
    updateUserRequest
} from "../../utils/burger-api";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/constants";

export const registerUser = (form: UserType): AppThunkAction => {
    return function (dispatch: AppDispatch) {
        dispatch(registerRequestAction());
        registerRequest(form).then((res) => {
            if (res.success) {
                setCookie(ACCESS_TOKEN, getToken(res.accessToken));
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
                dispatch(registerSuccessAction({...res.user}));
            } else {
                dispatch(registerFailedAction(getErrorMessage(res)));
            }
        }).catch(err => {
            console.log(err);
            dispatch(registerFailedAction(getErrorMessage(err)));
        })
    }
};

export const signIn = (form: LoginType): AppThunkAction => {
    return function (dispatch: AppDispatch) {
        dispatch(authRequestAction());
        loginRequest(form).then(res => {
            if (res.success) {
                setCookie(ACCESS_TOKEN, getToken(res.accessToken));
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
                dispatch(authSuccessAction({...res.user}));
            } else {
                dispatch(authFailedAction(getErrorMessage(res)));
            }
        }).catch(err => {
            console.log(err)
            dispatch(authFailedAction(getErrorMessage(err)));
        })
    }
};

export function getUser() {
    return function (dispatch: AppDispatch) {
        getUserRequest().then(res => {
            if (res.success) {
                setCookie(ACCESS_TOKEN, getToken(res.accessToken));
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
                dispatch(getUserAction({...res.user}));
            }
        }).catch(err => {
            if (getErrorMessage(err) === 'jwt expired') {
                updateTokenRequest().then(res => {
                    if (res && res.success) {
                        console.log('token updated')
                        setCookie('accessToken', getToken(res.accessToken));
                        setCookie('refreshToken', res.refreshToken);
                        getUserRequest().then(res => {
                            if (res.success) {
                                setCookie(ACCESS_TOKEN, getToken(res.accessToken));
                                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
                                dispatch(getUserAction({...res.user}));
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        });
    }
}

export function updateUser(form: UserType) {
    return function (dispatch: AppDispatch) {
        dispatch(updateUserRequestAction());
        updateUserRequest(form).then((res) => {
            if (res.success) {
                setCookie(ACCESS_TOKEN, getToken(res.accessToken));
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
                dispatch(updateUserSuccessAction({...res.user}));
            }
        }).catch(err => {
            console.log(err);
            dispatch(updateUserFailedAction());
        })
    }
}

export function signOut() {
    return function (dispatch: AppDispatch) {
        const token = localStorage.getItem(REFRESH_TOKEN)!;
        logoutRequest(token).then(() => {
            dispatch(signOutAction());
        }).catch(err => {
            console.log(err)
        });
    }
}

export function recoverPassword(email: string) {
    return recoverPasswordRequest(email).then((res) => {
        if (res.success) {
            localStorage.setItem('allowResetPassword', 'allow');
        }
    });
}

export function resetPassword(password: string, token: string) {
    return resetPasswordRequest(password, token).then((res) => {
        if (res.success) {
            localStorage.setItem('allowResetPassword', '');
        }
    });
}

function getToken(accessToken: string) {
    return accessToken.split('Bearer ')[1];
}

function getErrorMessage(error: any) {
    return error && error.message ? error.message : JSON.stringify(error);
}