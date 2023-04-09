import {getCookie, setCookie} from '../../utils/cookie';
import {actions as userActions} from '../slices/user';
import {URL_RECOVERY_PASSWORD, URL_RESET_PASSWORD, URL_UPDATE_TOKEN, URL_UPDATE_USER} from "../../utils/constants";

export const ACCESS_TOKEN = 'burgerAccessToken';
export const REFRESH_TOKEN = 'burgerRefreshToken';

const refreshTokenUpdater = async (dispatcher, action) => {
    try {
        const request = await fetch(URL_UPDATE_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: localStorage.getItem(REFRESH_TOKEN)})
        });

        if (!request.ok) {
            throw new Error('Ошибка при запросе.');
        }
        const data = await request.json();

        setCookie(ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken);

        dispatcher(action(data));
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUserData = (newUserData, token) => {
    const {setUserRequest, setUserError, setUserSuccess, setUpdatedTokens} = userActions;

    return async dispatch => {
        try {
            dispatch(setUserRequest());
            const request = await fetch(URL_UPDATE_USER, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: getCookie(ACCESS_TOKEN)
                },
                body: JSON.stringify(newUserData)
            });

            if (!request.ok) {
                const error = await request.json();
                if (error.message === 'jwt expired') {
                    await refreshTokenUpdater(dispatch, setUpdatedTokens);
                } else {
                    throw new Error('Ошибка');
                }
            }
            const data = await request.json();

            dispatch(setUserSuccess({
                ...data,
                accessToken: token,
                refreshToken: localStorage.getItem(REFRESH_TOKEN)
            }));
        } catch (error) {
            dispatch(setUserError(error.message));
        }
    }
}
export const recoveryPass = async (email) => {
    try {
        const request = await fetch(URL_RECOVERY_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });

        if (!request.ok) {
            throw new Error('Ошибка при запросе.');
        }
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

export const resetPass = async ({password, token}) => {
    try {
        const request = await fetch(URL_RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                token
            })
        });

        if (!request.ok) {
            throw new Error('Ошибка при запросе.');
        }
    } catch (error) {
        console.log(error.message);
        return error;
    }
}



