import React from "react";
import doneImage from '../../images/done.png'
import PropTypes from "prop-types";
import style from './order-details.module.css'

const OrderDetails = ({orderId, error}) => {
    return (
        <>
            {error && <div>
                Упс! Похоже, повар уснул и мы не сможем выполнить заказ сейчас. Зайдите, пожалуйста, чуть позже.
            </div>}
            {!error && <div className={style.content}>
                <div className={`${style.order_number} mb-8`}>
                    <span className={`${style.order_number}text text_type_digits-large`}>{orderId}</span>
                </div>
                <div><p className={`${style.title} text text_type_main-medium`}>идентификатор заказа</p></div>
                <div className={`${style.image_container} mt-15 mb-15`}><img src={doneImage} alt=''></img></div>
                <div className={`${style.content} mb-30`}>
                    <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                        станции</p>
                </div>
            </div>}
        </>
    )
}

OrderDetails.propTypes = {
    orderId: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
};

export default OrderDetails;