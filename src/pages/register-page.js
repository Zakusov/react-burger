import {useCallback, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';


import {Button, Input, Logo, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register-page.module.css';
import {useAuth} from "../utils/auth";

export const RegisterPage = () => {
    const auth = useAuth();
    const [form, setValue] = useState({name: '', email: '', password: ''});

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    let register = useCallback(
        e => {
            e.preventDefault();
            auth.register(form);
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
            <p className={`text text_type_main-medium ${styles.title}`}>Регистрация</p>

            <div className={styles.inputWrapper}>
                <Input name="name" type={'text'} placeholder={'Имя'} value={form.name}
                       onChange={event => onChange(event)}/>
            </div>
            <div className={styles.inputWrapper}>
                <Input name="email" type={'email'} placeholder={'Email'} value={form.email}
                       onChange={event => onChange(event)}/>
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" placeholder={'Пароль'} value={form.password}
                               onChange={event => onChange(event)}/>
            </div>

            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="large" onClick={register}>Зарегистрироваться</Button>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Уже зарегистрированы?</p>
                <Link to="/login" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</Link>
            </div>
        </div>
    );
}
