// Авторизация
import {AppDispatch, AppThunkAction, LoginType, UserType} from "../types";
import {
    authFailedAction,
    authRequestAction,
    authSuccessAction,
    registerFailedAction,
    registerRequestAction,
    registerSuccessAction,
    signInAction,
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
                updateTokens(res.accessToken, res.refreshToken);
                dispatch(signInAction({...res.user}));
                dispatch(registerSuccessAction());
            } else {
                dispatch(registerFailedAction(getErrorMessage(res)));
            }
        }).catch(err => {
            console.log(err);
            dispatch(registerFailedAction(getErrorMessage(err)));
        })
    }
};

export const login = (form: LoginType): AppThunkAction => {
    return function (dispatch: AppDispatch) {
        dispatch(authRequestAction());
        loginRequest(form).then(res => {
            if (res.success) {
                updateTokens(res.accessToken, res.refreshToken);
                dispatch(signInAction({...res.user}));
                dispatch(authSuccessAction());
            } else {
                dispatch(authFailedAction(getErrorMessage(res)));
            }
        }).catch(err => {
            console.log(err)
            dispatch(authFailedAction(getErrorMessage(err)));
        })
    }
};

function updateAccessTokenAndSignIn(dispatch: AppDispatch) {
    updateTokenRequest().then(res => {
        if (res && res.success) {
            console.log('token updated')
            updateTokens(res.accessToken, res.refreshToken);
            getUserRequest().then(res => {
                if (res.success) {
                    dispatch(signInAction({...res.user}));
                }
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

/**
 * Проверяет авторизацию пользователя.
 */
export function checkAuthorization() {
    return function (dispatch: AppDispatch) {
        getUserRequest().then(res => {
            if (res.success) {
                dispatch(signInAction({...res.user}));
            } else if (getErrorMessage(res) === 'jwt expired') {
                updateAccessTokenAndSignIn(dispatch);
            } else {
                dispatch(signOut());
            }
        }).catch(err => {
            if (getErrorMessage(err) === 'jwt expired') {
                updateAccessTokenAndSignIn(dispatch);
            } else {
                dispatch(signOut());
            }
        });
    }
}

function updateTokens(accessToken: string, refreshToken: string) {
    setCookie(ACCESS_TOKEN, getTokenFromString(accessToken));
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

export function updateUser(form: UserType) {
    return function (dispatch: AppDispatch) {
        dispatch(updateUserRequestAction());
        updateUserRequest(form).then((res) => {
            if (res.success) {
                updateTokens(res.accessToken, res.refreshToken);
                dispatch(signInAction({...res.user}));
                dispatch(updateUserSuccessAction());
            } else {
                dispatch(updateUserFailedAction(getErrorMessage(res)));
            }
        }).catch(err => {
            console.log(err);
            dispatch(updateUserFailedAction(getErrorMessage(err)));
        })
    }
}

export function signOut() {
    return function (dispatch: AppDispatch) {
        const token = localStorage.getItem(REFRESH_TOKEN);
        if (token) {
            logoutRequest(token).catch(err => console.log(err));
        }
        dispatch(signOutAction());
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

function getTokenFromString(accessTokenString: string) {
    return accessTokenString.split('Bearer ')[1];
}

function getErrorMessage(error: any) {
    return error && error.message ? error.message : JSON.stringify(error);
}