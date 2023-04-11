import {useCallback, useRef} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {Button, Input, Logo} from '@ya.praktikum/react-developer-burger-ui-components';

import {resetPass} from "../services/actions/account-actions";
import {useForm} from "../hooks/useForm";
import styles from './reset-password.module.css';

export const ResetPasswordPage = () => {
    const passRef = useRef(null);
    const navigate = useNavigate();
    const {values, handleChange, setValues} = useForm({token: '', password: '', type: 'password', icon: 'ShowIcon'});

    const onEyeClick = () => {
        setValues({
            ...values,
            type: values.type === 'password' ? 'text' : 'password',
            icon: values.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
        });
    };

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            if (values.password && values.token) {
                resetPass({
                    password: values.password,
                    token: values.token
                })
                    .then(result => {
                        console.log("Reset password result: " + result);
                        if (result instanceof Error) throw new Error();
                        localStorage.setItem('allowResetPassword', '');
                        navigate('/login', {replace: true})
                    })
                    .catch(error => console.log(error));
            }
        },
        [values, navigate]
    );

    return (
        localStorage.getItem('allowResetPassword') ?
            (<form className={styles.wrapper} onSubmit={onSubmit}>
                <div className={styles.logo}>
                    <Logo/>
                </div>
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
