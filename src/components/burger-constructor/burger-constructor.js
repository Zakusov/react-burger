import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.js";

import OrderDetails from "../order-details/order-details.js"
import {createOrder} from "../../utils/burger-api";

import styles from "./burger-constructor.module.css";
import {addIngredient} from "../../services/actions/order-actions";

const BurgerConstructor = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(0);
    const [error, setError] = React.useState(false);

    /** Содержимое корзины **/
    const {bun, filling, price} = useSelector(state => state.order);

    // FIXME Временное решение: заполняем конструктор всеми ингридиентами
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => state.ingredients);
    React.useEffect(() => {
        ingredients.forEach(item => dispatch(addIngredient(item)));
    }, [dispatch, ingredients]);

    const onCreateOrder = () => {
        const ingredientIds = filling.map(element => element._id);
        ingredientIds.push(bun._id);
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
                {bun &&
                    <ul className={styles.bun}>
                        <li className='mb-4 ml-2'>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}/>
                        </li>
                    </ul>
                }
                <ul className={styles.scrollList}>
                    {filling?.map(item => {
                        return (
                            <li className='mb-4 ml-2' key={item.id}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image}/>
                            </li>
                        )
                    })}
                </ul>
                {bun &&
                    <ul className={styles.bun}>
                        <li className='mb-4 ml-2'>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}/>
                        </li>
                    </ul>
                }
                <section className={styles.bottomBoxContainer}>
                    <p className="text text_type_digits-medium">{price}</p>
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