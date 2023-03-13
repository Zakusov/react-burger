import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../modal/modal.js';
import OrderDetails from '../order-details/order-details.js'

const BurgerConstructor = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false);

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title=''>
                    <OrderDetails/>
                </Modal>
            }
            <div className={`${styles.container} pr-4 pl-4 ml-10`}>
                <ul>
                    <li className='mb-4 ml-8'>
                        <div className={styles.borderEdge}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={20}
                                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                            />
                        </div>
                    </li>
                    <li className='mb-4'>
                        <ul className={styles.scrollList}>
                            {props.arr.map((elem) => {
                                if (elem.type !== 'bun') {
                                    return (
                                        <li className='mb-4 ml-2' key={elem._id}>
                                            <DragIcon type="primary"/>
                                            <ConstructorElement text={elem.name} price={elem.price}
                                                                thumbnail={elem.image}/>
                                        </li>)
                                }
                            })}
                        </ul>
                    </li>
                    <li className='mb-4 ml-8'>
                        <div>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text="Краторная булка N-200i (низ)"
                                price={20}
                                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                            />
                        </div>
                    </li>
                </ul>
                <section className={styles.bottomBoxContainer}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary"/>
                    <div className='ml-10'>
                        <Button type="primary" size="large" onClick={() => setModalVisible(!modalVisible)}>
                            Оформить заказ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}

BurgerConstructor.propTypes = {
    arr: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired
        })
    )
};
export default BurgerConstructor;