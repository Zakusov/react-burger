import {IngredientType} from "./data";

export type SelectedIngredientType = IngredientType & {
    id: string;
}

export type LoginType = {
    email: string;
    password: string;
}

export type UserType = {
    name: string;
} & LoginType;

