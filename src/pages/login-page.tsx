import React, {FormEvent, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import {useAuth} from "../utils/auth";
import {useForm} from "../hooks/useForm";
import styles from './login-page.module.css';

export const LoginPage = () => {
    const auth = useAuth();
    const {values, handleChange} = useForm({email: '', password: ''});
    const [error, setError] = useState<String>();

    function onError(err: Error) {
        setError(err && err.message ? err.message : "Что-то пошло не так :(");
    }

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            auth.signIn(values)
                .catch(onError);
        },
        [auth, values]
    );

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            {error && <p className={`text text_color_error ${styles.error}`}>{error}</p>}

            <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>

            <div className={styles.inputWrapper}>
                <Input name="email" type="email" placeholder="Email" value={values.email}
                       onChange={handleChange}/>
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" placeholder="Пароль" value={values.password}
                               onChange={handleChange}/>
            </div>

            <div className={styles.button}>
                <Button htmlType="submit" type="primary" size="large">Войти</Button>
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
        </form>
    );
}
