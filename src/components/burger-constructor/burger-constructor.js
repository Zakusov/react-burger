import React from "react";
import {useSelector} from "react-redux";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.js";

import OrderDetails from "../order-details/order-details.js"
import {createOrder} from "../../utils/burger-api";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(0);
    const [error, setError] = React.useState(false);

    /** Все ингридиенты **/
    const {ingredients} = useSelector(state => state.ingredients);

    /** Все ингридиенты, кроме булок **/
    const notBuns = React.useMemo(
        () => ingredients.filter((item) => item.type !== "bun"),
        [ingredients]
    );

    const onCreateOrder = () => {
        const ingredientIds = notBuns.map(element => element._id);
        // Булка сверху
        ingredientIds.push("60d3b41abdacab0026a733c6");
        // Булка снизу
        ingredientIds.push("60d3b41abdacab0026a733c6");
        createOrder(ingredientIds).then((res) => {
            setOrderId(res.order.number);
        }).catch((e) => {
            setError(true);
            console.log(e);
        });
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title=''>
                    <OrderDetails orderId={orderId} error={error}/>
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
                    {notBuns.map(element => {
                        return (
                            <li className='mb-4 ml-2' key={element._id}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={element.name} price={element.price}
                                                    thumbnail={element.image}/>
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
                        <Button htmlType="button" type="primary" size="large" onClick={onCreateOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BurgerConstructor;