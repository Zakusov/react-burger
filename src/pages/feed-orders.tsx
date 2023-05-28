import React, {useCallback, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "../services/hooks";
import {IOrder} from "../services/types";
import {WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START} from "../services/constants";
import OrderCard from "../components/order-card/order-card";
import styles from "./feed-orders.module.css"

const FeedOrdersPage = () => {

    const {isLoading, isFailed} = useSelector(state => state.ingredients);
    const {orders, ordersDone, ordersPending, ordersTotal, totalToday} = useSelector(state => state.feeds);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: WS_FEED_CONNECTION_START});
        return () => {
            dispatch({type: WS_FEED_CONNECTION_CLOSED});
        }
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const setCurrentOrder = useCallback((id: string) => {
        navigate(`/feed/${id}`, {state: {...state, background: location}});
    }, [dispatch, navigate, location]);

    const allOrders = orders as Array<IOrder>;
    const doneOrders = ordersDone as Array<number>;
    const pendingOrders = ordersPending as Array<number>;

    return (
        <main className={styles.wrapper}>
            <h1 className={`mt-10 text text_type_main-large`}>Лента заказов</h1>
            {isLoading && !isFailed
                ? <p className="text text_type_main-medium">Идет загрузка...</p>
                : <div className={styles.container}>
                    <section className={styles.sectionCards}>
                        <ul className={styles.orderCards}>
                            {allOrders.map(order => {
                                return <OrderCard order={order} key={order.number} setCurrOrder={setCurrentOrder}/>
                            })}
                        </ul>
                    </section>
                    <section className={styles.sectionOrders}>
                        <div className={styles.ordersBoard}>
                            <div>
                                <h2 className={`text text_type_main-medium pb-6`}>Готовы:</h2>
                                <ul className={styles.ordersBoard_done}>
                                    {doneOrders.map((orderNumber, index) => {
                                        return <li key={index}
                                                   className={`text text_type_digits-default ${styles.ordersBoardList_done}`}>{orderNumber}</li>
                                    })}
                                </ul>
                            </div>
                            <div>
                                <h2 className={`text text_type_main-medium pb-6`}>В работе:</h2>
                                <ul className={styles.ordersBoard_done}>
                                    {pendingOrders.map((orderNumber, index) => {
                                        return <li key={index}
                                                   className={`text text_type_digits-default`}>{orderNumber}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.ordersTotal}>
                            <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
                            <p className={`text text_type_digits-large`}>{ordersTotal}</p>
                        </div>
                        <div className={styles.ordersTotal}>
                            <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
                            <p className={`text text_type_digits-large`}>{totalToday}</p>
                        </div>
                    </section>
                </div>
            }
        </main>
    );
};

export default FeedOrdersPage;
