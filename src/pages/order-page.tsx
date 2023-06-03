import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";

import {useDispatch, useSelector} from "../services/hooks";
import {SET_CURRENT_WS_USER_FEED, WS_USER_FEED_CONNECTION_START} from "../services/constants";
import styles from "./order-page.module.css"
import OrderInfo from "../components/order-info/order-info";
import {IngredientType} from "../services/types";

const OrderPage = () => {
    const {ingredients} = useSelector(state => state.ingredients);
    const {id} = useParams();
    const {orders, currentOrder} = useSelector(state => state.userFeeds);
    const [orderIngredients, setOrderIngredients] = useState<Array<IngredientType>>();
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();
    useEffect(
        () => {
            if (orders) {
                if (orders.length === 0) {
                    dispatch({type: WS_USER_FEED_CONNECTION_START});
                } else if (id) {
                    dispatch({type: SET_CURRENT_WS_USER_FEED, payload: id});
                }
            }
        },
        [orders, id, dispatch]
    );

    useEffect(
        () => {
            if (currentOrder) {
                if (currentOrder.ingredients) {
                    setOrderIngredients(currentOrder.ingredients.map((item) => {
                        return ingredients.filter(ingredient => ingredient._id === item)[0];
                    }));
                }
                setIsLoaded(true);
            }
        },
        [currentOrder, ingredients]
    );

    return (
        <>
            {!isLoaded || !orderIngredients || !currentOrder
                ? <p className={styles.loading}>Идет загрузка...</p>
                : <OrderInfo info={currentOrder} orderIngredients={orderIngredients}/>
            }
        </>
    )
};

export default OrderPage;
