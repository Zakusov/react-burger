import {Link, useNavigate} from 'react-router-dom';
import {Button, Input, Logo} from '@ya.praktikum/react-developer-burger-ui-components';

import {recoveryPass} from "../services/actions/account-actions";
import {useForm} from "../hooks/useForm";
import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const {values, handleChange} = useForm({email: ''});

    const onRecoveryClick = () => {
        if (values.email) {
            recoveryPass(values.email)
                .then(result => {
                    if (result instanceof Error) throw new Error();
                    localStorage.setItem('allowResetPassword', 'allow');
                    navigate('/reset-password', {replace: true});
                })
                .catch(error => console.log(error));
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>

            <div className={styles.inputWrapper}>
                <Input name="email" type="email" placeholder="E-mail" value={values.email}
                       onChange={event => handleChange(event)}/>
            </div>

            <div className={styles.button}>
                <Button htmlType="button" onClick={onRecoveryClick} type="primary" size="large">Восстановить</Button>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Вспомнили пароль?</p>
                <Link to="/login" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</Link>
            </div>
        </div>
    );
}
