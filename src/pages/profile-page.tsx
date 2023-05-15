import React, {FormEvent, useCallback} from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileLinks} from '../components/profile-links/profile-links';
import {useForm} from "../hooks/useForm";
import {useAuth} from "../utils/auth";
import {UserType} from "../services/types";
import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const auth = useAuth();
    const user: UserType = auth.user!;
    const initialState = {name: user?.name, email: user.email, password: ''};
    const {values, handleChange, setValues} = useForm(initialState);

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            auth.update(values)
                .catch((error) => console.log(error));
        },
        [auth, values]
    );

    const onCancel = () => setValues(initialState);

    return (
        <>
            <form className={styles.mainProfileWrapper} onSubmit={onSubmit}>
                <div className={styles.profileWrapper}>
                    <div className={styles.linksWrapper}>
                        <ProfileLinks/>
                    </div>
                    <div>
                        <div className={styles.inputsWrapper}>
                            <div className={styles.inputWrapper}>
                                <Input name="name" type="text" icon="EditIcon" placeholder="Имя"
                                       value={values.name} onChange={handleChange}/>
                            </div>

                            <div className={styles.inputWrapper}>
                                <Input name="email" type="text" icon="EditIcon" placeholder="Логин"
                                       value={values.email} onChange={handleChange}/>
                            </div>

                            <div className={styles.inputWrapper}>
                                <PasswordInput name="password" icon="EditIcon" placeholder="Пароль"
                                               value={values.password} onChange={handleChange}/>
                            </div>

                            <div className={styles.buttonsWrapper}>
                                <Button htmlType="submit" type="primary" size="large">Сохранить</Button>
                                <Button htmlType="button" type="primary" size="large"
                                        onClick={onCancel}>Отменить</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
