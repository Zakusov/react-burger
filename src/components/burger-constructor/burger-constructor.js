import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal.js";
import OrderDetails from "../order-details/order-details.js"
import OrderItem from "../order-item/order-item";

import {createOrder} from "../../utils/burger-api";
import {addIngredient, deleteAll, replaceFilling} from "../../services/actions/order-actions";
import styles from "./burger-constructor.module.css";

/** Возвращает первый ингредиент указанного типа. */
function getFirst(ingredients, type) {
    const [first] = ingredients.filter((item) => item.type === type);
    return first;
}

/** Исходный состав бургера. */
function getInitialComposition(ingredients) {
    const bun = getFirst(ingredients, "bun");
    const sauce = getFirst(ingredients, "sauce");
    const main = getFirst(ingredients, "main");
    return [bun, sauce, main].filter(item => item && item.type);
}

const BurgerConstructor = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(0);
    const [error, setError] = React.useState(false);

    // Содержимое корзины
    const {bun, filling, price} = useSelector(state => state.order);

    // Исходный состав бургера
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => state.ingredients);
    React.useEffect(() => {
        // Состав исходных ингредиентов изменился. Очищаем корзину.
        dispatch(deleteAll());
        // Формируем новый состав.
        getInitialComposition(ingredients).forEach(item => dispatch(addIngredient(item)));
    }, [dispatch, ingredients]);

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
            <div className={`${styles.container} pt-15`} ref={dropTargetRef}>
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