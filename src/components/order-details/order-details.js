import style from './order-details.module.css'
import checkind from '../../images/done.png'

const OrderDetails = () => {
    return (
        <div className={style.content}>
            <div className={`${style.order_number} mb-8`}><span
                className={`${style.order_number}text text_type_digits-large`}>034536</span></div>
            <div><p className={`${style.title} text text_type_main-medium`}>идентификатор заказа</p></div>
            <div className={`${style.image_container} mt-15 mb-15`}><img src={checkind} alt=''></img></div>
            <div className={`${style.content} mb-30`}>
                <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                    станции</p>
            </div>
        </div>
    )
}

export default OrderDetails;