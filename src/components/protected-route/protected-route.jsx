import {Navigate, useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import {useAuth} from "../../utils/auth";

/**
 * Если пользователь не авторизован и пытается попасть на защищённый маршрут, то переадресовываем его на страницу входа.
 * Если пользователь авторизован и пытается попасть на страницу для неавторизованных пользователей, то возвращаем его на предыдущую страницу.
 */
export const ProtectedRoute = ({children, anonymous = false}) => {
    const auth = useAuth();

    useEffect(() => {
        auth.getUser().catch((error) => console.log(error));
    }, [auth]);

    const location = useLocation();
    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && auth.user) {
        // ...то отправляем его на предыдущую страницу
        const from = location.state?.from || '/';
        return <Navigate to={from}/>;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !auth.user) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return children;
}