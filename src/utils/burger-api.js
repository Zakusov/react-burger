import {BASE_URL} from "./constants";
import {getCookie} from "./cookie";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../services/actions/account-actions";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

const request = (endpoint, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse)
}

export const registerRequest = (form) => {
    return request('auth/register', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const loginRequest = (form) => {
    return request('auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const updateUserRequest = (form) => {
    return request('auth/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie(ACCESS_TOKEN)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const getUserRequest = () => {
    return request('auth/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie(ACCESS_TOKEN)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
};

export const updateTokenRequest = () => {
    const token = localStorage.getItem(REFRESH_TOKEN);
    return request('auth/token', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: getCookie(ACCESS_TOKEN)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({token})
    });
};

export const logoutRequest = (token) => {
    return request('auth/logout', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({token})
    });
};

export const getIngredients = () => {
    return request("ingredients");
};

export const createOrder = (ingredientIds) => {
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
