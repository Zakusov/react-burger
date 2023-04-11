import {getCookie} from "./cookie";
import {ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN} from "./constants";

const checkResponse = async (res) => {
    return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

const request = async (endpoint, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse)
}

export const registerRequest = async (form) => {
    return request('auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(form)
    });
};

export const loginRequest = async (form) => {
    return request('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
};

export const updateUserRequest = async (form) => {
    return request('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie(ACCESS_TOKEN)
        },
        body: JSON.stringify(form)
    });
};

export const getUserRequest = async () => {
    return request('auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie(ACCESS_TOKEN)
        }
    });
};

export const recoverPasswordRequest = async (email) => {
    return request('password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });
};

export const resetPasswordRequest = async (password, token) => {
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
            Authorization: getCookie(ACCESS_TOKEN)
        },
        body: JSON.stringify({token})
    });
};

export const logoutRequest = async (token) => {
    return request('auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    });
};

export const getIngredients = async () => {
    return request("ingredients");
};

export const createOrder = async (ingredientIds) => {
    return request("orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ingredients": ingredientIds
        })
    });
};
