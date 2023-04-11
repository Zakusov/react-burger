import {useCallback} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import {useAuth} from "../utils/auth";
import {useForm} from "../hooks/useForm";
import styles from './register-page.module.css';

export const RegisterPage = () => {
    const auth = useAuth();
    const {values, handleChange} = useForm({name: '', email: '', password: ''});

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            auth.register(values)
                .catch((error) => console.log(error));
        },
        [auth, values]
    );

    if (auth.user) {
        return (<Navigate to={'/'}/>);
    }

    return (
        <form className={styles.wrapper} onSubmit={onSubmit}>
            <p className={`text text_type_main-medium ${styles.title}`}>Регистрация</p>

            <div className={styles.inputWrapper}>
                <Input name="name" type={'text'} placeholder={'Имя'} value={values.name}
                       onChange={handleChange}/>
            </div>
            <div className={styles.inputWrapper}>
                <Input name="email" type={'email'} placeholder={'Email'} value={values.email}
                       onChange={handleChange}/>
            </div>
            <div className={styles.inputWrapper}>
                <PasswordInput name="password" placeholder={'Пароль'} value={values.password}
                               onChange={handleChange}/>
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
