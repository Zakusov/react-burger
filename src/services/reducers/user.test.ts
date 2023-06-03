import {AnyAction} from "redux";
import {initialUserState, userReducer} from "./user";
import {
    GET_AUTH_FAILED,
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_REGISTER_FAILED,
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    GET_USER
} from "../constants";

const testUser = {
    name: "Ivan",
    email: "ivan@pupkin.ru",
    password: "qwerty"
};

describe('User reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {} as AnyAction)).toEqual(initialUserState)
    })

    it('should handle GET_REGISTER_REQUEST', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_REGISTER_REQUEST
            })
        ).toEqual({
            ...initialUserState,
            registerRequest: true,
            registerSuccess: false,
            registerFailMessage: null,
            loggedIn: false
        })
    })

    it('should handle GET_REGISTER_SUCCESS', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_REGISTER_SUCCESS,
                payload: testUser
            })
        ).toEqual({
            ...initialUserState,
            registerRequest: false,
            registerSuccess: true,
            loggedIn: true,
            user: {name: "Ivan", email: "ivan@pupkin.ru"}
        })
    })

    it('should handle GET_REGISTER_FAILED', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_REGISTER_FAILED,
                payload: "User already exists"
            })
        ).toEqual({
            ...initialUserState,
            registerRequest: false,
            registerFailMessage: "User already exists"
        })
    })

    it('should handle GET_AUTH_REQUEST', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_AUTH_REQUEST
            })
        ).toEqual({
            ...initialUserState,
            authRequest: true,
            authSuccess: false,
            authFailMessage: null,
            loggedIn: false
        })
    })

    it('should handle GET_AUTH_SUCCESS', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_AUTH_SUCCESS,
                payload: testUser
            })
        ).toEqual({
            ...initialUserState,
            authRequest: false,
            authSuccess: true,
            loggedIn: true,
            user: {name: "Ivan", email: "ivan@pupkin.ru"}
        })
    })

    it('should handle GET_AUTH_FAILED', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_AUTH_FAILED,
                payload: "email or password are incorrect"
            })
        ).toEqual({
            ...initialUserState,
            authRequest: false,
            authFailMessage: "email or password are incorrect"
        })
    })

    it('should handle GET_USER', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_USER,
                payload: testUser
            })
        ).toEqual({
            ...initialUserState,
            loggedIn: true,
            user: {name: "Ivan", email: "ivan@pupkin.ru"}
        })
    })
})