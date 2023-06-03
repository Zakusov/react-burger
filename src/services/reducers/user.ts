import {
    GET_AUTH_FAILED,
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_REGISTER_FAILED,
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    LOG_IN,
    LOG_OUT,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "../constants";
import {TUserActions} from "../actions";

export interface IUserState {
    registerRequest: boolean;
    registerSuccess: boolean;
    registerFailMessage: string | null;

    authRequest: boolean;
    authSuccess: boolean;
    authFailMessage: string | null;

    updateUserRequest: boolean;
    updateUserSuccess: boolean;
    updateFailMessage: string | null;

    user: {
        name: string,
        email: string
    } | null;
}

export const initialUserState: IUserState = {
    registerRequest: false,
    registerFailMessage: null,
    registerSuccess: false,

    authRequest: false,
    authFailMessage: null,
    authSuccess: false,

    updateUserRequest: false,
    updateUserSuccess: false,
    updateFailMessage: null,

    user: null
}

export const userReducer = (state = initialUserState, action: TUserActions): IUserState => {
    switch (action.type) {
        case GET_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerSuccess: false,
                registerFailMessage: null
            };
        }
        case GET_REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerSuccess: true
            };
        }
        case GET_REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailMessage: action.payload
            };
        }
        case GET_AUTH_REQUEST: {
            return {
                ...state,
                authRequest: true,
                authSuccess: false,
                authFailMessage: null
            };
        }
        case GET_AUTH_SUCCESS: {
            return {
                ...state,
                authRequest: false,
                authSuccess: true
            };
        }
        case GET_AUTH_FAILED: {
            return {
                ...state,
                authRequest: false,
                authFailMessage: action.payload
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserSuccess: false,
                updateFailMessage: null
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: true
            };
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateFailMessage: action.payload
            };
        }
        case LOG_IN: {
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload.name,
                    email: action.payload.email || ''
                }
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                user: null
            };
        }
        default: {
            return state;
        }
    }
}