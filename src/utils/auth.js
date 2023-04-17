import React, {createContext, useContext, useState} from 'react';

import {deleteCookie, setCookie} from "./cookie";
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    recoverPasswordRequest,
    registerRequest,
    resetPasswordRequest,
    updateTokenRequest,
    updateUserRequest
} from "./burger-api";

import {ACCESS_TOKEN, REFRESH_TOKEN} from "./constants";

const AuthContext = createContext(undefined);

export function ProvideAuth({children}) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const getErrorMessage = (error) => error && error.message ? error.message : "Упс";

    const getUser = async () => {
        return getUserRequest().then(data => {
            if (data.success) {
                setUser({...data.user, id: data.user._id});
            }
            return data.success;
        }).catch(error => {
            const message = getErrorMessage(error);
            if (message === 'jwt expired') {
                return updateTokenRequest().then(() => {
                    console.log("Token updated");
                });
            }
        });
    };

    const register = async (form) => {
        return registerRequest(form).then((res) => {
            if (res.success) {
                setUser({...res.user, id: res.user._id});
                setCookie(ACCESS_TOKEN, res.accessToken);
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
            } else {
                deleteUserData();
            }
        });
    };

    const update = async (form) => {
        return updateUserRequest(form).then((res) => {
            if (res.success) {
                setUser({...res.user, id: res.user._id});
                setCookie(ACCESS_TOKEN, res.accessToken);
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
            } else {
                deleteUserData();
            }
        });
    };

    const recoverPassword = async (email) => {
        return recoverPasswordRequest(email).then((res) => {
            if (res.success) {
                localStorage.setItem('allowResetPassword', 'allow');
            }
        });
    };

    const resetPassword = async (password, token) => {
        return resetPasswordRequest(password, token).then((res) => {
            if (res.success) {
                localStorage.setItem('allowResetPassword', '');
            }
        });
    };

    const signIn = async (form) => {
        return loginRequest(form).then((res) => {
            if (res.success) {
                setUser({...res.user, id: res.user._id});
                setCookie(ACCESS_TOKEN, res.accessToken);
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
            } else {
                deleteUserData();
            }
        });
    };

    const signOut = async () => {
        const token = localStorage.getItem(REFRESH_TOKEN);
        return logoutRequest(token).then(() => {
            deleteUserData();
        });
    };

    function deleteUserData() {
        setUser(null);
        deleteCookie(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }

    return {
        user,
        getUser,
        register,
        update,
        recoverPassword,
        resetPassword,
        signIn,
        signOut
    };
}