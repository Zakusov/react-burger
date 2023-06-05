import {AnyAction} from "redux";
import {initialUserState, userReducer} from "./user";
import {
    GET_AUTH_FAILED,
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_REGISTER_FAILED,
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    LOG_OUT,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
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
            registerFailMessage: null
        })
    })

    it('should handle GET_REGISTER_SUCCESS', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_REGISTER_SUCCESS
            })
        ).toEqual({
            ...initialUserState,
            registerRequest: false,
            registerSuccess: true
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
            authFailMessage: null
        })
    })

    it('should handle GET_AUTH_SUCCESS', () => {
        expect(
            userReducer({...initialUserState}, {
                type: GET_AUTH_SUCCESS
            })
        ).toEqual({
            ...initialUserState,
            authRequest: false,
            authSuccess: true
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

    it('should handle UPDATE_USER_REQUEST', () => {
        expect(
            userReducer({...initialUserState}, {
                type: UPDATE_USER_REQUEST
            })
        ).toEqual({
            ...initialUserState,
            updateUserRequest: true,
            updateUserSuccess: false,
            updateFailMessage: null
        })
    })

    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(
            userReducer({...initialUserState}, {
                type: UPDATE_USER_SUCCESS
            })
        ).toEqual({
            ...initialUserState,
            updateUserRequest: false,
            updateUserSuccess: true
        })
    })

    it('should handle UPDATE_USER_FAILED', () => {
        expect(
            userReducer({...initialUserState}, {
                type: UPDATE_USER_FAILED,
                payload: "Ошибка обновления данных пользователя"
            })
        ).toEqual({
            ...initialUserState,
            updateUserRequest: false,
            updateFailMessage: "Ошибка обновления данных пользователя"
        })
    })

    it('should handle LOG_OUT', () => {
        expect(
            userReducer({...initialUserState, user: testUser}, {
                type: LOG_OUT
            })
        ).toEqual({
            ...initialUserState,
            user: null
        })
    })
})