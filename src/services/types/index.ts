export type LoginType = {
    email: string;
    password: string;
}

export type UserType = {
    name: string;
} & LoginType;

