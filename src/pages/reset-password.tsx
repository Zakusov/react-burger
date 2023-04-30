import {FormEvent, useCallback, useRef} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import {useAuth} from "../utils/auth";
import {useForm} from "../hooks/useForm";
import styles from './reset-password.module.css';

type ResetPasswordType = {
    token: string;
    password: string;
    type: 'text' | 'email' | 'password';
    icon: keyof TICons;
}

export const ResetPasswordPage = () => {
    const auth = useAuth();
    const passRef = useRef(null);
    const navigate = useNavigate();
    const {values, handleChange, setValues} = useForm<ResetPasswordType>({
        token: '',
        password: '',
        type: 'password',
        icon: 'ShowIcon'
    });

    const onEyeClick = () => {
        setValues({
            ...values,
            type: values.type === 'password' ? 'text' : 'password',
            icon: values.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
        });
    };

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            if (values.password && values.token) {
                auth.resetPassword(values.password, values.token)
                    .then(() => navigate('/login', {replace: true}))
                    .catch(error => console.log(error));
            }
        },
        [values, auth, navigate]
    );

    return (
        localStorage.getItem('allowResetPassword') ?
            (<form className={styles.wrapper} onSubmit={onSubmit}>
                <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>

                <div className={styles.inputWrapper}>
                    <Input name="password" type={values.type} placeholder="Введите новый пароль"
                           value={values.password}
                           onChange={handleChange}
                           icon={values.icon}
                           ref={passRef}
                           onIconClick={onEyeClick}/>
                </div>

                <div className={styles.inputWrapper}>
                    <Input name="token" type="text" placeholder="Введите код из письма"
                           value={values.token}
                           onChange={handleChange}/>
                </div>

                <div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="large">Сохранить</Button>
                </div>

                <div className={styles.footer}>
                    <p className={`text text_type_main-default ${styles.footerInfo}`}>Вспомнили пароль?</p>
                    <Link to="/login" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</Link>
                </div>
            </form>)
            : <Navigate to={'/login'}/>
    );
}
