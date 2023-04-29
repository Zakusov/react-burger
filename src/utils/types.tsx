export type IngredientType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type SelectedIngredientType = IngredientType & {
    id: string;
}

export type LoginType = {
    email: string;
    password: string;
}

export type UserType = {
    name: string;
    id?: string;
} & LoginType;

