import React, {useCallback, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "../services/hooks";
import OrderCard from "../components/order-card/order-card";
import {WS_USER_FEED_CONNECTION_CLOSED, WS_USER_FEED_CONNECTION_START} from "../services/constants";
import styles from "./orders-page.module.css"

const OrdersPage = () => {
    const {ordersUserFeed} = useSelector(state => state.userFeeds);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: WS_USER_FEED_CONNECTION_START});
        return () => {
            dispatch({type: WS_USER_FEED_CONNECTION_CLOSED});
        }
    }, [dispatch]);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const setCurrentOrder = useCallback((id: string) => {
        navigate(`/profile/orders/${id}`, {state: {...state, background: location}});
    }, [navigate, location]);

    return (
        !ordersUserFeed
            ? <p className="text text_type_main-medium">Идет загрузка...</p>
            : <div className={styles.container}>
                <ul className={styles.orderCards}>
                    {ordersUserFeed.map(order => {
                        return <OrderCard order={order} key={order.number} setCurrOrder={setCurrentOrder}/>
                    })}
                </ul>
            </div>
    );
};

export default OrdersPage;
