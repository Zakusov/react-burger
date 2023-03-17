import {NORMA_API} from "./constants";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

export const getIngredients = () => {
  return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
};

export const createOrder = (ingredientIds) => {
  return fetch(`${NORMA_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "ingredients": ingredientIds
    })
  }).then(checkResponse);
};
