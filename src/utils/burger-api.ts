import {getCookie} from "./cookie";
import {ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN} from "./constants";

import {LoginType, UserType} from "../services/types";

const checkResponse = async (res: Response) => {
    return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

const request = async (endpoint: string, options?: RequestInit) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse)
}

export const registerRequest = async (form: UserType) => {
    return request('auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    });
};

export const loginRequest = async (form: LoginType) => {
    return request('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
};

export const updateUserRequest = async (form: UserType) => {
    return request('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie(ACCESS_TOKEN)!
        },
        body: JSON.stringify(form)
    });
};

export const getUserRequest = async () => {
    return request('auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie(ACCESS_TOKEN)!
        }
    });
};

export const recoverPasswordRequest = async (email: string) => {
    return request('password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });
};

export const resetPasswordRequest = async (password: string, token: string) => {
    return request('password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, token})
    });
};

export const updateTokenRequest = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN);
    return request('auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: getCookie(ACCESS_TOKEN)!
        },
        body: JSON.stringify({token})
    });
};

export const logoutRequest = async (token: string) => {
    return request('auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    });
};

export const getIngredientsRequest = async () => {
    return request("ingredients");
};

export const createOrderRequest = async (ingredients: Array<string>) => {
    return request("orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ingredients})
    });
};
