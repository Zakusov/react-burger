import {FormEvent, useCallback} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import {useForm} from "../hooks/useForm";
import {useAuth} from "../utils/auth";
import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {values, handleChange} = useForm({email: ''});

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            if (values.email) {
                auth.recoverPassword(values.email)
                    .then(() => navigate('/reset-password', {replace: true}))
                    .catch(error => console.log(error));
            }
        },
        [values, auth, navigate]
    );

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>

            <div className={styles.inputWrapper}>
                <Input name="email" type="email" placeholder="E-mail" value={values.email ? values.email : ''}
                       onChange={handleChange}/>
            </div>

            <div className={styles.button}>
                <Button htmlType="submit" type="primary" size="large">Восстановить</Button>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Вспомнили пароль?</p>
                <Link to="/login" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</Link>
            </div>
        </form>
    );
}
