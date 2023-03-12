import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';

const Card = ({onClick, image, price, name, onDetails, info}) => {

    const [count, setCount] = React.useState(0);

    const onCardClick = () => {
        onClick(true);
        onDetails(info)
    }

    return (
        <>
            <div className='ml-4 mb-8' style={{width: '265px'}} onClick={onCardClick}>
                <div style={{position: 'relative'}}>
                    <Counter count={count} size="default"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img className='mb-1' src={image}/>
                    <div className='mb-1' style={{display: 'flex'}}>
                        <p className="text text_type_digits-default">{price}</p><CurrencyIcon type="primary"/>
                    </div>
                </div>

                <div className={styles.textCont}>
                    <p className="text text_type_main-default" style={{textAlign: "center"}}>
                        {name}
                    </p>
                </div>
            </div>
        </>
    )
}
Card.propTypes = {
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default Card;