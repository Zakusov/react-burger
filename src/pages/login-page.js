import {useCallback, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Input, Logo, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import {useAuth} from "../utils/auth";
import styles from './login-page.module.css';

export const LoginPage = () => {
    const auth = useAuth();
    const [form, setValue] = useState({email: '', password: ''});

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    let login = useCallback(
        e => {
            e.preventDefault();
            auth.signIn(form);
        },
        [auth, form]
    );

    if (auth.user) {
        return (<Navigate to={'/'}/>);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>

            <div className={styles.inputWrapper}>
                <Input name="email" type={'email'} placeholder={'Email'} value={form.email}
                       onChange={event => onChange(event)}/>
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" placeholder={'Пароль'} value={form.password}
                               onChange={event => onChange(event)}/>
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
