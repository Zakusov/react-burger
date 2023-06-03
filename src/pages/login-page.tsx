import React, {FormEvent, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import {signIn} from "../services/thunks";
import {useDispatch, useSelector} from "../services/hooks";
import {useForm} from "../hooks/useForm";
import {LoginType} from "../services/types";
import styles from './login-page.module.css';

export const LoginPage = () => {
    const initialValues: LoginType = {email: '', password: ''};
    const {values, handleChange} = useForm(initialValues);
    const {authFailMessage} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            dispatch(signIn(values));
        },
        [values]
    );

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            {authFailMessage && <p className={styles.error}>{authFailMessage}</p>}

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
