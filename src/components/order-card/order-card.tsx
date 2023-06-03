import React, {useEffect, useState} from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

import {useSelector} from "../../services/hooks";
import OrderIngredientsImage from "../order-ingredients-image/order-ingredients-image";
import {IngredientType, IOrder} from "../../services/types";
import styles from './order-card.module.css'

type TOrderCardProps = {
    order: IOrder;
    setCurrOrder: (id: string) => void;
}

const OrderCard = ({order, setCurrOrder}: TOrderCardProps) => {

    const {ingredients} = useSelector(store => store.ingredients);
    const [orderIngredients, setIngredientsOrder] = useState<Array<IngredientType>>([]);
    const [orderSum, setOrderSum] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIngredientsOrder(order.ingredients.map((itemId) => {
            return ingredients.filter(item => item._id === itemId)[0]
        }))
    }, [order.ingredients, ingredients]);

    useEffect(() => {
        if (orderIngredients.length !== 0) {
            setIsLoaded(true);
            setOrderSum(orderIngredients.reduce((total, item) => {
                return total + (item?.price || 0);
            }, 0))
        }
    }, [orderIngredients]);

    function onOrderClick() {
        setCurrOrder(order._id)
    }

    return (
        isLoaded
            ? <ul className={`${styles.feedOrder} `} onClick={onOrderClick}>
                <li className={styles.orderNumberDate}>
                    <p className={`text text_type_digits-default`}>#{order.number}</p>
                    <FormattedDate className={`text text_type_main-default text_color_inactive`}
                                   date={new Date(order.createdAt)}/>
                </li>
                <li className={`text text_type_main-medium`}>{order.name}</li>
                <li className={styles.iconsAndTotal}>
                    <OrderIngredientsImage orderIngredients={orderIngredients}/>
                    <div className={styles.price}>
                        <p className="text text_type_digits-medium">{orderSum}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </li>
            </ul>
            : <p className="mt-10 ml-10 mb-10 pt-3 text text_type_main-large">Идет загрузка...</p>
    );
};

export default OrderCard;
