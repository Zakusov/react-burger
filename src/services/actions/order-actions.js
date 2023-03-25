export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const DELETE_ALL = "DELETE_ALL";

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    ingredient
});

export const deleteIngredient = (id) => ({
    type: DELETE_INGREDIENT,
    id
});

export const deleteAll = () => ({
    type: DELETE_ALL
});