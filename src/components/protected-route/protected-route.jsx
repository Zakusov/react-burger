import {Navigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAuth} from "../../utils/auth";

/**
 * Если пользователь не авторизован и пытается попасть на защищённый маршрут, то переадресовываем его на маршрут /login.
 *
 * @param element элемент для авторизованного пользователя.
 */
export const ProtectedRouteElement = ({element}) => {
    const {getUser, ...auth} = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        getUser().then(() => setUserLoaded(true))
            .catch((error) => console.log(error));
    }, [getUser]);

    if (!isUserLoaded) {
        return null;
    }

    return auth.user ? element : <Navigate to="/login" replace/>;
}