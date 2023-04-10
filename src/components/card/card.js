import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {ingredientType} from "../../utils/prop-types";
import styles from './card.module.css';

const Card = ({item}) => {

    const [count, setCount] = useState(0);

    // Содержимое корзины
    const {bun, filling} = useSelector(state => state.order);

    // Обновление счётчика добавленных ингредиентов
    useEffect(() => {
        if (item.type === 'bun') {
            setCount(item._id === bun?._id ? 1 : 0);
        } else {
            setCount(filling.filter(elem => elem._id === item._id).length);
        }
    }, [item, bun, filling]);

    const navigate = useNavigate();

    const onCardClick = () => {
        navigate(`/ingredients/${item._id}`);
    };

    const [{opacity}, dragRef] = useDrag({
        type: 'ingredient',
        item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.1 : 1
        })
    });

    return (
        <>
            <div className={`${styles.main} ml-4 mb-8`} style={{opacity}} onClick={onCardClick} ref={dragRef}>
                {count > 0 &&
                    <div className={styles.counter}>
                        <Counter count={count} size="default"/>
                    </div>
                }
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
    item: ingredientType.isRequired
}

export default Card;