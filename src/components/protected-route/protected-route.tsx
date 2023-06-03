import {Navigate, useLocation} from 'react-router-dom';
import {FC, HTMLAttributes, useEffect} from 'react';
import {useDispatch, useSelector} from "../../services/hooks";
import {checkAuthorization} from "../../services/thunks";

type TProtectedRouteProps = {
    anonymous?: boolean;
} & HTMLAttributes<HTMLElement>;

/**
 * Если пользователь не авторизован и пытается попасть на защищённый маршрут, то переадресовываем его на страницу входа.
 * Если пользователь авторизован и пытается попасть на страницу для неавторизованных пользователей, то возвращаем его на предыдущую страницу.
 */
export const ProtectedRoute: FC<TProtectedRouteProps> = ({children, anonymous = false}: TProtectedRouteProps) => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(checkAuthorization());
        }
    }, [user, dispatch]);

    const location = useLocation();
    if (anonymous && user) {
        const from = location.state?.from || '/';
        console.log(`Страница для неавторизованных пользователей. Перенаправляем на ${from}`);
        return <Navigate to={from}/>;
    }

    if (!anonymous && !user) {
        console.log("Страница для авторизованных пользователей. Перенаправляем на /login");
        return <Navigate to="/login" state={{from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return <>{children}</>;
}