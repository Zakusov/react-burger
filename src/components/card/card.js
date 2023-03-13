import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';
import {ingredientType} from "../../utils/prop-types";

const Card = ({item, onClick, setSelected}) => {

    const [count, setCount] = React.useState(0);

    const onCardClick = () => {
        onClick(true);
        setSelected(item);
    }

    return (
        <>
            <div className='ml-4 mb-8' style={{width: '265px'}} onClick={onCardClick}>
                <div style={{position: 'relative'}}>
                    <Counter count={count} size="default"/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img className='mb-1' src={item.image} alt={item.name}/>
                    <div className='mb-1' style={{display: 'flex'}}>
                        <p className="text text_type_digits-default">{item.price}</p><CurrencyIcon type="primary"/>
                    </div>
                </div>

                <div className={styles.textCont}>
                    <p className="text text_type_main-default" style={{textAlign: "center"}}>
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