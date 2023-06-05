import React, {FormEvent, useCallback} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import {registerUser} from "../services/thunks";
import {useDispatch, useSelector} from "../services/hooks";
import {useForm} from "../hooks/useForm";
import styles from './register-page.module.css';

export const RegisterPage = () => {
    const {values, handleChange} = useForm({name: '', email: '', password: ''});
    const {user, registerFailMessage} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            dispatch(registerUser(values));
        },
        [values, dispatch]
    );

    if (user) {
        return (<Navigate to={'/'}/>);
    }

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            {registerFailMessage && <p className={styles.error}>{registerFailMessage}</p>}

            <p className={`text text_type_main-medium ${styles.title}`}>Регистрация</p>

            <div className={styles.inputWrapper}>
                <Input name="name" type={'text'} placeholder={'Имя'} value={values.name} onChange={handleChange}/>
            </div>
            <div className={styles.inputWrapper}>
                <Input name="email" type={'email'} placeholder={'Email'} value={values.email} onChange={handleChange}/>
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" placeholder={'Пароль'} value={values.password} onChange={handleChange}/>
            </div>

            <div className={styles.button}>
                <Button htmlType="submit" type="primary" size="large">Зарегистрироваться</Button>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Уже зарегистрированы?</p>
                <Link to="/login" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</Link>
            </div>
        </form>
    );
}
