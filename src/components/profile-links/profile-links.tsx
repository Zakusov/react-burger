import {useCallback} from "react";
import {NavLink, Outlet, useNavigate} from 'react-router-dom';

import {useAuth} from "../../utils/auth";
import styles from './profile-links.module.css';

export const ProfileLinks = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = useCallback(
        () => {
            auth.signOut()
                .then(() => navigate('/login', {replace: true}))
                .catch((error) => console.log(error));
        },
        [auth, navigate]
    );

    const setActive = ({isActive}: { isActive: boolean }) => isActive ? `${styles.active}` : `${styles.pending}`;

    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.menuProfile}>
                    <div className={styles.itemMenu}>
                        <NavLink className={setActive} to="/profile">Профиль</NavLink>
                    </div>
                    <div className={styles.itemMenu}>
                        <NavLink className={setActive} to="/profile/orders">История заказов</NavLink>
                    </div>
                    <div className={`${styles.itemMenu} ${styles.lastItemMenu}`}>
                        <div onClick={logout} className={styles.pending}>Выход</div>
                    </div>

                    <p className={`text text_type_main-default ${styles.footerMenu}`}>В этом разделе вы можете изменить
                        свои персональные данные</p>
                </div>

                <Outlet/>
            </div>
        </main>
    );
}
