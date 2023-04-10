import React, {useCallback, useState} from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import {ProfileLinks} from '../components/profile-links/profile-links';
import {useAuth} from "../utils/auth";
import styles from './profile-page.module.css';
import AppHeader from "../components/app-header/app-header";

export const ProfilePage = () => {
    const auth = useAuth();
    const user = auth.user;
    const [form, setValue] =
        useState({name: user.name, email: user.email, password: ''});

    let onSave = useCallback(
        e => {
            e.preventDefault();
            auth.update(form);
        },
        [auth, form]
    );

    const onCancel = () => setValue({
        name: user.name,
        email: user.email,
        password: ''
    });

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
                                <Input
                                    icon={'EditIcon'}
                                    type={'text'}
                                    placeholder={'Имя'}
                                    value={form.name}
                                    onChange={
                                        (event) => setValue({
                                            ...form,
                                            name: event.target.value
                                        })
                                    }/>
                            </div>

                            <div className={styles.inputWrapper}>
                                <Input
                                    icon={'EditIcon'}
                                    type={'text'}
                                    placeholder={'Логин'}
                                    value={form.email}
                                    onChange={
                                        (event) => setValue({
                                            ...form,
                                            email: event.target.value
                                        })
                                    }/>
                            </div>

                            <div className={styles.inputWrapper}>
                                <Input
                                    icon={'EditIcon'}
                                    type={form.password ? 'password' : 'text'}
                                    placeholder={'Пароль'}
                                    value={form.password}
                                    onChange={
                                        (event) => setValue({
                                            ...form,
                                            password: event.target.value
                                        })
                                    }/>
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
