import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useDrop} from "react-dnd";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal.js";
import OrderDetails from "../order-details/order-details.tsx"
import OrderItem from "../order-item/order-item";
import {useAuth} from "../../utils/auth";
import {addIngredient, createOrder, deleteAll, replaceFilling} from "../../services/actions/order-actions";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    // Содержимое корзины
    const {bun, filling, price, isFailed, orderId} = useSelector(state => state.order);

    // Исходный состав бургера
    const dispatch = useDispatch();

    // Добавление ингредиента перетаскиванием
    const [{isHover}, dropTargetRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch(addIngredient(item))
        }
    });

    /** Меняет ингредиенты местами. */
    const onMoveCard = useCallback((dragIndex, hoverIndex) => {
        console.log("Меняем местами элементы " + dragIndex + " и " + hoverIndex)
        const dragItem = filling[dragIndex];
        const newFilling = [...filling];
        newFilling.splice(dragIndex, 1);
        newFilling.splice(hoverIndex, 0, dragItem);
        dispatch(replaceFilling(newFilling))
    }, [dispatch, filling]);

    const onCreateOrder = () => {
        if (auth.user) {
            dispatch(createOrder(bun, filling));
        } else {
            navigate('/login');
        }
    }

    const closeModal = () => {
        dispatch(deleteAll());
    };

    return (
        <>
            {orderId &&
                <Modal onClose={closeModal} title=''>
                    <OrderDetails orderId={orderId} error={isFailed}/>
                </Modal>
            }
            <div className={`${styles.container} pt-15`} ref={dropTargetRef}>
                {!bun &&
                    <div>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</div>
                }
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
                {filling &&
                    <ul className={styles.scrollList}>
                        {filling.map((item, index) => {
                            return (
                                <li className='mb-4 ml-2' key={item.id}>
                                    <OrderItem key={`item-${item.id}`} item={item} index={index} moveCard={onMoveCard}/>
                                </li>
                            )
                        })}
                    </ul>
                }
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
                        <Button htmlType="button" type="primary" size="large" onClick={onCreateOrder} disabled={!bun}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BurgerConstructor;