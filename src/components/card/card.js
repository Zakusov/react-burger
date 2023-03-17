import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from "../../utils/prop-types";
import styles from './card.module.css';

const Card = ({item, onClick, setSelected}) => {

    const [count, setCount] = React.useState(0);

    const onCardClick = () => {
        onClick(true);
        setSelected(item);
    }

    return (
        <>
            <div className={`${styles.main} ml-4 mb-8`} onClick={onCardClick}>
                <div className={styles.counter}>
                    <Counter count={count} size="default"/>
                </div>
                <div className={styles.image}>
                    <img className='mb-1' src={item.image} alt={item.name}/>
                    <div className={`${styles.price} mb-1`}>
                        <p className="text text_type_digits-default">{item.price}</p><CurrencyIcon type="primary"/>
                    </div>
                </div>

                <div className={styles.textDiv}>
                    <p className="text text_type_main-default">
                        {item.name}
                    </p>
                </div>
            </div>
        </>
    )
}
Card.propTypes = {
    item: ingredientType.isRequired,
    onClick: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export default Card;