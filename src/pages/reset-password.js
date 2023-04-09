import {useEffect, useRef, useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';

import {Button, Input, Logo} from '@ya.praktikum/react-developer-burger-ui-components';

import {resetPass} from "../services/actions/account-actions";
import styles from './reset-password.module.css';

export const ResetPasswordPage = () => {
    const passRef = useRef(null);

    const navigate = useNavigate();

    const [token, setToken] = useState('');

    const [passwordConfig, setPasswordConfig] = useState({
        type: 'password',
        value: '',
        icon: 'ShowIcon'
    });

    const onEyeClick = () => {
        setPasswordConfig({
            ...passwordConfig,
            type: passwordConfig.type === 'password' ? 'text' : 'password',
            icon: passwordConfig.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
        });
    };

    const onSave = () => {
        if (passwordConfig.value && token) {
            resetPass({
                password: passwordConfig.value,
                token
            })
                .then(result => {
                    if (result instanceof Error) throw new Error();
                    localStorage.setItem('allowResetPassword', '');
                    navigate('/login', {replace: true})
                })
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        return () => localStorage.setItem('allowResetPassword', '');
    }, []);

    return (
        localStorage.getItem('allowResetPassword') ?
            (<div className={styles.wrapper}>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>

                <div className={styles.inputWrapper}>
                    <Input
                        type={passwordConfig.type}
                        placeholder={'Введите новый пароль'}
                        value={passwordConfig.value}
                        onChange={event => setPasswordConfig({
                            ...passwordConfig,
                            value: event.target.value
                        })}
                        icon={passwordConfig.icon}
                        ref={passRef}
                        onIconClick={onEyeClick}/>
                </div>

                <div className={styles.inputWrapper}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={token}
                        onChange={event => setToken(event.target.value)}/>
                </div>

                <div className={styles.button}>
                    <Button htmlType="button" type="primary" size="large" onClick={onSave}>Сохранить</Button>
                </div>

                <div className={styles.footer}>
                    <p className={`text text_type_main-default ${styles.footerInfo}`}>Вспомнили пароль?</p>
                    <Link to="/login" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</Link>
                </div>
            </div>)
            : <Navigate to={'/login'}/>
    );
}
