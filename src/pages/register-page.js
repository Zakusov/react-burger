import {useCallback} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Input, Logo, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register-page.module.css';
import {useAuth} from "../utils/auth";
import {useForm} from "../hooks/useForm";

export const RegisterPage = () => {
    const auth = useAuth();
    const {values, handleChange} = useForm({name: '', email: '', password: ''});

    let register = useCallback(
        e => {
            e.preventDefault();
            auth.register(values);
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
            <p className={`text text_type_main-medium ${styles.title}`}>Регистрация</p>

            <div className={styles.inputWrapper}>
                <Input name="name" type={'text'} placeholder={'Имя'} value={values.name}
                       onChange={event => handleChange(event)}/>
            </div>
            <div className={styles.inputWrapper}>
                <Input name="email" type={'email'} placeholder={'Email'} value={values.email}
                       onChange={event => handleChange(event)}/>
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" placeholder={'Пароль'} value={values.password}
                               onChange={event => handleChange(event)}/>
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
