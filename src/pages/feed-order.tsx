import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";

import {useDispatch, useSelector} from "../services/hooks";
import OrderInfo from "../components/order-info/order-info";
import {SET_CURRENT_WS_FEED, WS_FEED_CONNECTION_START} from "../services/constants";
import styles from "./feed-order.module.css"
import {IngredientType, IOrder} from "../services/types";

const FeedOrderPage = () => {
    const {ingredients} = useSelector(state => state.ingredients);
    const {orders, currentOrder} = useSelector(state => state.feeds);
    const {id} = useParams();
    const [orderIngredients, setOrderIngredients] = useState<Array<IngredientType>>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();
    useEffect(
        () => {
            if (orders) {
                const allOrders = orders as Array<IOrder>;
                if (allOrders.length === 0) {
                    dispatch({type: WS_FEED_CONNECTION_START});
                } else if (id) {
                    dispatch({type: SET_CURRENT_WS_FEED, payload: id});
                }
            }
        },
        [orders]
    );

    useEffect(
        () => {
            if (currentOrder) {
                const order = currentOrder as IOrder;
                if (order.ingredients) {
                    setOrderIngredients(order.ingredients.map((ingredientId) => {
                        return ingredients.filter(item => item._id === ingredientId)[0];
                    }));
                    setIsLoaded(true);
                }
            }
        },
        [currentOrder]
    );

    return (
        <>
            {!isLoaded
                ? <p className={styles.loading}>Идет загрузка...</p>
                : <OrderInfo info={currentOrder} orderIngredients={orderIngredients}/>
            }
        </>
    )
};

export default FeedOrderPage;
