import React, {useEffect, useState} from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

import {IngredientType, IOrder} from "../../services/types";
import styles from "./order-info.module.css";

interface IOrderInfoProps {
    info: IOrder;
    orderIngredients: Array<IngredientType>;
}

interface IKeyToNumber {
    [key: string]: number
}

const OrderInfo = ({info, orderIngredients}: IOrderInfoProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [counter, setCounter] = useState<IKeyToNumber>();
    const [price, setPrice] = useState<IKeyToNumber>();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const itemCounter: IKeyToNumber = {};
        const itemPrice: IKeyToNumber = {}
        let orderPrice = 0;
        for (const item of orderIngredients) {
            itemCounter[item._id] = (itemCounter[item._id] || 0) + 1;
            itemPrice[item._id] = (itemPrice[item._id] || 0) + item.price;
            orderPrice += item.price;
        }
        setCounter(itemCounter);
        setPrice(itemPrice);
        setTotalPrice(orderPrice);
        setIsLoaded(true);
    }, [orderIngredients]);

    return (
        !isLoaded || !info
            ? <p className="text text_type_main-medium">Идет загрузка...</p>
            : <div className={styles.modal_orderInfo}>
                <h1 className={`text text_type_digits-default ${styles.id}`}>#{info.number}</h1>
                <p className={`${styles.name} text text_type_main-medium mt-10`}>{info.name}</p>
                {info.status === 'done'
                    ? <p className={`${styles.statusDone} text text_type_main-small mt-3`}>Выполнен</p>
                    : info.status === 'pending'
                        ? <p className={`${styles.statusDone} text text_type_main-small mt-3`}>В работе</p>
                        : <p className={`${styles.statusDone} text text_type_main-small mt-3`}>Отменен</p>
                }
                <p className={`text_type_main-medium mt-15`}>Состав:</p>
                <ul className={`${styles.ingredientsList} mt-6 pr-6`}>
                    {
                        counter && price && Object.keys(counter).map((key, index) => {
                            const ingredient = orderIngredients.find(ingredient => ingredient._id === key)!;
                            return (
                                <li className={styles.ingredient} key={index}>
                                    <div className={styles.ingredientContainer}>
                                        <img className={styles.ingredientImage} src={ingredient.image_mobile}
                                             alt={ingredient.name}/>
                                        <p className={`${styles.name} text text_type_main-small`}>{ingredient.name}</p>
                                    </div>
                                    <div className={`text text_type_main-large ${styles.ingredientPrice}`}>
                                        <p className="text text_type_digits-default">{counter[key]} x {price[key]}</p>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className={`${styles.modal_footer} mt-10`}>
                    <FormattedDate className={`text text_type_main-default text_color_inactive`}
                                   date={new Date(info.createdAt)}/>
                    <div className={`text text_type_main-large ${styles.total}`}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
    );
};

export default OrderInfo;
