import {
    GET_AUTH_FAILED,
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_REGISTER_FAILED,
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    GET_USER,
    SIGN_OUT,
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
    loggedIn: boolean;
    updateUserRequest: boolean;
    updateUserSuccess: boolean;
    updateUserFailed: boolean;
    user: {
        name: string,
        email: string
    } | null;
}

export const initialUserState: IUserState = {
    registerRequest: false,
    registerFailMessage: null,
    registerSuccess: false,
    loggedIn: false,
    authRequest: false,
    authFailMessage: null,
    authSuccess: false,
    updateUserRequest: false,
    updateUserSuccess: false,
    updateUserFailed: false,
    user: null
}

export const userReducer = (state = initialUserState, action: TUserActions): IUserState => {
    switch (action.type) {
        case GET_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerSuccess: false,
                registerFailMessage: null,
                loggedIn: false
            };
        }
        case GET_REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerSuccess: true,
                loggedIn: true,

                user: {
                    ...state.user,
                    name: action.payload.name,
                    email: action.payload.email || ''
                }
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
                authFailMessage: null,
                loggedIn: false
            };
        }
        case GET_AUTH_SUCCESS: {
            return {
                ...state,
                authRequest: false,
                authSuccess: true,
                loggedIn: true,
                user: {
                    ...state.user,
                    name: action.payload.name,
                    email: action.payload.email || ''
                }
            };
        }
        case GET_AUTH_FAILED: {
            return {
                ...state,
                authRequest: false,
                authFailMessage: action.payload
            };
        }
        case GET_USER: {
            return {
                ...state,
                loggedIn: true,
                user: {
                    ...state.user,
                    name: action.payload.name,
                    email: action.payload.email || ''
                }
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
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
                updateUserFailed: true,
                updateUserRequest: false
            };
        }
        case SIGN_OUT: {
            return {
                ...state,
                loggedIn: false
            };
        }
        default: {
            return state;
        }
    }
}