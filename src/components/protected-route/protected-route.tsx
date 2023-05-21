import {Navigate, useLocation} from 'react-router-dom';
import {FC, HTMLAttributes, useEffect} from 'react';
import {useAuth} from "../../utils/auth";

type TProtectedRouteProps = {
    anonymous?: boolean;
} & HTMLAttributes<HTMLElement>;

/**
 * Если пользователь не авторизован и пытается попасть на защищённый маршрут, то переадресовываем его на страницу входа.
 * Если пользователь авторизован и пытается попасть на страницу для неавторизованных пользователей, то возвращаем его на предыдущую страницу.
 */
export const ProtectedRoute: FC<TProtectedRouteProps> = ({children, anonymous = false}: TProtectedRouteProps) => {
    const auth = useAuth();

    useEffect(() => {
        auth.getUser().catch((error) => console.log(error));
    }, [auth]);

    const location = useLocation();
    if (anonymous && auth.user) {
        const from = location.state?.from || '/';
        console.log(`Страница для неавторизованных пользователей. Перенаправляем на ${from}`);
        return <Navigate to={from}/>;
    }

    if (!anonymous && !auth.user) {
        console.log("Страница для авторизованных пользователей. Перенаправляем на /login");
        return <Navigate to="/login" state={{from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return <>{children}</>;
}