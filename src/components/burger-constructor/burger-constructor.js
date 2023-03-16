import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import React from 'react';
import Modal from '../modal/modal.js';
import OrderDetails from '../order-details/order-details.js'
import {IngredientsContext} from "../../utils/context";

const BurgerConstructor = () => {

    const [modalVisible, setModalVisible] = React.useState(false);

    /** Все ингридиенты **/
    const ingredients = React.useContext(IngredientsContext);

    /** Все ингридиенты, кроме булок **/
    const notBuns = React.useMemo(
        () => ingredients.filter((item) => item.type !== "bun"),
        [ingredients]
    );

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title=''>
                    <OrderDetails/>
                </Modal>
            }
            <div className={`${styles.container} pt-15`}>
                <ul className={styles.bun}>
                    <li className='mb-4 ml-2'>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={20}
                            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                    </li>
                </ul>
                <ul className={styles.scrollList}>
                    {notBuns.map((elem) => {
                        return (
                            <li className='mb-4 ml-2' key={elem._id}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={elem.name} price={elem.price} thumbnail={elem.image}/>
                            </li>
                        )
                    })}
                </ul>
                <ul className={styles.bun}>
                    <li className='mb-4 ml-2'>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={20}
                            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}/>
                    </li>
                </ul>
                <section className={styles.bottomBoxContainer}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary"/>
                    <div className='ml-10'>
                        <Button htmlType="button" type="primary" size="large"
                                onClick={() => setModalVisible(!modalVisible)}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BurgerConstructor;