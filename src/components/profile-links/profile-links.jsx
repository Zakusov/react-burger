import {useCallback} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
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

    return (
        <div className={styles.menuProfile}>
            <div className={styles.itemMenu}>
                <NavLink className={styles.active} to="/profile">Профиль</NavLink>
            </div>
            <div className={styles.itemMenu}>
                <div className={styles.pending}>История заказов</div>
            </div>
            <div className={`${styles.itemMenu} ${styles.lastItemMenu}`}>
                <div onClick={logout} className={styles.pending}>Выход</div>
            </div>

            <p className={`text text_type_main-default ${styles.footerMenu}`}>В этом разделе вы можете изменить свои
                персональные данные</p>
        </div>
    );
}
