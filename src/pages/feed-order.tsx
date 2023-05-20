import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "../services/hooks";
import Modal from "../components/modal/modal";
import OrderInfo from "../components/order-info/order-info";
import {REMOVE_CURRENT_ORDER_FEED, SET_CURRENT_ORDER_FEED, WS_FEED_CONNECTION_START} from "../services/constants";
import styles from "./feed-order.module.css"
import {IngredientType, IOrder} from "../services/types";

const FeedOrderPage = () => {

    const {ingredients} = useSelector(state => state.ingredients);
    const {orders, currentOrder} = useSelector(state => state.feeds);
    const {id} = useParams();
    const [orderIngredients, setOrderIngredients] = useState<Array<IngredientType>>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const closeModal = () => {
        dispatch({type: REMOVE_CURRENT_ORDER_FEED});
        navigate(-1);
    };

    useEffect(
        () => {
            if (orders) {
                const allOrders = orders as Array<IOrder>;
                if (allOrders.length === 0) {
                    dispatch({type: WS_FEED_CONNECTION_START});
                } else if (id) {
                    dispatch({type: SET_CURRENT_ORDER_FEED, payload: id});
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
        <Modal onClose={closeModal} title=''>
            {!isLoaded
                ? <p className={styles.loading}>Идет загрузка...</p>
                : <OrderInfo info={currentOrder} orderIngredients={orderIngredients}/>
            }
        </Modal>
    )
};

export default FeedOrderPage;
