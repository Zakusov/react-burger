import React, {createContext, useContext, useState} from 'react';
import {deleteCookie, setCookie} from "./cookie";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../services/actions/account-actions";

import {getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest} from "./burger-api";

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

    const getUser = () => {
        return getUserRequest()
            .then(data => {
                if (data.success) {
                    setUser({...data.user, id: data.user._id});
                }
                return data.success;
            });
    };

    const register = form => {
        registerRequest(form).then((res) => {
            if (res.success) {
                setUser({...res.user, id: res.user._id});
                setCookie(ACCESS_TOKEN, res.accessToken);
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
            } else {
                deleteUserData();
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const update = form => {
        updateUserRequest(form).then((res) => {
            if (res.success) {
                setUser({...res.user, id: res.user._id});
                setCookie(ACCESS_TOKEN, res.accessToken);
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
            } else {
                deleteUserData();
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const signIn = form => {
        loginRequest(form).then((res) => {
            if (res.success) {
                setUser({...res.user, id: res.user._id});
                setCookie(ACCESS_TOKEN, res.accessToken);
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
            } else {
                deleteUserData();
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    const signOut = () => {
        const token = localStorage.getItem(REFRESH_TOKEN);
        logoutRequest(token).then(() => {
            deleteUserData();
        }).catch((e) => {
            console.log(e);
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
        signIn,
        signOut
    };
}