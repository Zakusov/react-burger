import React, {FormEvent, useCallback} from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useForm} from "../hooks/useForm";
import styles from './profile-page.module.css';
import {useDispatch, useSelector} from "../services/hooks";
import {updateUser} from "../services/thunks";

export const ProfilePage = () => {
    const {user} = useSelector(state => state.user);
    const initialState = {name: user?.name || '', email: user?.email || '', password: ''};
    const {values, handleChange, setValues} = useForm(initialState);
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            dispatch(updateUser(values));
        },
        [values]
    );

    const onCancel = () => setValues(initialState);

    return (
        <>
            <form className={styles.mainProfileWrapper} onSubmit={onSubmit}>
                <div className={styles.profileWrapper}>
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
