import React, {useCallback} from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from "../components/app-header/app-header";
import {ProfileLinks} from '../components/profile-links/profile-links';
import {useAuth} from "../utils/auth";
import {useForm} from "../hooks/useForm";
import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const auth = useAuth();
    const user = auth.user;
    const initialState = {name: user.name, email: user.email, password: ''};
    const {values, handleChange, setValues} = useForm(initialState);

    const onSave = useCallback(
        e => {
            e.preventDefault();
            auth.update(values);
        },
        [auth, values]
    );

    const onCancel = () => setValues(initialState);

    return (
        <>
            <AppHeader/>
            <div className={styles.mainProfileWrapper}>
                <div className={styles.profileWrapper}>
                    <div className={styles.linksWrapper}>
                        <ProfileLinks/>
                    </div>
                    <div>
                        <div className={styles.inputsWrapper}>
                            <div className={styles.inputWrapper}>
                                <Input name="name" type="text" icon="EditIcon" placeholder="Имя"
                                       value={values.name} onChange={event => handleChange(event)}/>
                            </div>

                            <div className={styles.inputWrapper}>
                                <Input name="email" type="text" icon="EditIcon" placeholder="Логин"
                                       value={values.email} onChange={event => handleChange(event)}/>
                            </div>

                            <div className={styles.inputWrapper}>
                                <PasswordInput name="password" icon="EditIcon" placeholder="Пароль"
                                               value={values.password} onChange={event => handleChange(event)}/>
                            </div>

                            <div className={styles.buttonsWrapper}>
                                <Button htmlType="button" type="primary" size="large"
                                        onClick={onSave}>Сохранить</Button>
                                <Button htmlType="button" type="primary" size="large"
                                        onClick={onCancel}>Отменить</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
