import {createSlice} from '@reduxjs/toolkit';

const userInitialState = {
    success: false,
    user: {
        email: '',
        name: ''
    },
    accessToken: '',
    refreshToken: '',
    error: '',
    isBlocked: false,
    isExit: false
};

const slice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUserRequest(state) {
            state.isBlocked = true;
            state.isExit = false;
        },
        setUserError(state, action) {
            state.success = action.payload.success;
            state.error = action.payload;
            state.user.email = '';
            state.user.name = '';
            state.accessToken = '';
            state.refreshToken = '';
            state.isBlocked = false;
            state.isExit = false;
        },
        setUserSuccess(state, action) {
            state.success = action.payload.success;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = '';
            state.isBlocked = false;
            state.isExit = false;
        },
        setUserClear(state) {
            state.success = true;
            state.user.email = '';
            state.user.name = '';
            state.accessToken = '';
            state.refreshToken = '';
            state.error = '';
            state.isBlocked = false;
            state.isExit = true;
        },
        setUpdatedTokens(state, action) {
            state.accessToken = action.payload.accessToken;
        }
    }
});

export const {reducer, actions} = slice;
