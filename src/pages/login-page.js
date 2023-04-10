import React, {useCallback, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Input, Logo, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import {useAuth} from "../utils/auth";
import {useForm} from "../hooks/useForm";
import styles from './login-page.module.css';

export const LoginPage = () => {
    const auth = useAuth();
    const {values, handleChange} = useForm({email: '', password: ''});
    const [error, setError] = useState(null);

    function onError(err) {
        setError(err && err.message ? err.message : "Что-то пошло не так :(");
    }

    let login = useCallback(
        e => {
            e.preventDefault();
            auth.signIn(values, onError);
        },
        [auth, values]
    );

    if (auth.user) {
        return (<Navigate to={'/'}/>);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            {error && <p className={`text text_color_error ${styles.error}`}>{error}</p>}

            <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>

            <div className={styles.inputWrapper}>
                <Input name="email" type="email" placeholder="Email" value={values.email}
                       onChange={event => handleChange(event)}/>
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" placeholder="Пароль" value={values.password}
                               onChange={event => handleChange(event)}/>
            </div>

            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="large" onClick={login}>Войти</Button>
            </div>

            <div className={`mb-4 ${styles.footer}`}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Вы — новый пользователь?</p>
                <Link to="/register"
                      className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Зарегистрироваться</Link>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Забыли пароль?</p>
                <Link to="/forgot-password" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Восстановить
                    пароль</Link>
            </div>
        </div>
    );
}
