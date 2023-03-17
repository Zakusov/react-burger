import {NORMA_API} from "./constants";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

const request = (endpoint, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse)
}

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
