import {Navigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAuth} from "../../utils/auth";

/**
 * Если пользователь не авторизован и пытается попасть на защищённый маршрут, то переадресовываем его на маршрут /login.
 *
 * @param element элемент для авторизованного пользователя.
 */
export const ProtectedRouteElement = ({element}) => {
    let {getUser, ...auth} = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return auth.user ? element : <Navigate to="/login" replace/>;
}