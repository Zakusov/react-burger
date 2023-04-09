import {useCallback} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from "../../utils/auth";
import styles from './profile-links.module.css';

export const ProfileLinks = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = useCallback(
        () => {
            auth.signOut();
            navigate('/login', {replace: true});
        },
        [auth, navigate]
    );

    return (
        <div className={styles.menuProfile}>
            <div className={styles.itemMenu}>
                <NavLink exact to="/profile"
                         className={`text text_type_main-medium ${styles.link} ${styles.unchecked}`}
                         activeClassName={styles.checked}>Профиль
                </NavLink>
            </div>
            <div className={styles.itemMenu}>
                <NavLink exact to="/profile/orders"
                         className={`text text_type_main-medium ${styles.link} ${styles.unchecked}`}
                         activeClassName={styles.checked}>История заказов
                </NavLink>
            </div>
            <div className={`${styles.itemMenu} ${styles.lastItemMenu}`}>
                <div onClick={logout}
                     className={`text text_type_main-medium ${styles.link} ${styles.exitBtn} ${styles.unchecked}`}>Выход
                </div>
            </div>

            <p className={`text text_type_main-default ${styles.footerMenu}`}>В этом разделе вы можете изменить свои
                персональные данные</p>
        </div>
    );
}
