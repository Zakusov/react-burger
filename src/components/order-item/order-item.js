import React from "react";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

import {deleteIngredient} from "../../services/actions/order-actions";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientType} from "../../utils/prop-types";
import PropTypes from "prop-types";

import styles from "./order-item.module.css";

const OrderItem = ({item, index, moveCard}) => {

    const itemRef = React.useRef(null);

    const [{opacity}, drag] = useDrag({
        type: 'component',
        item: () => ({id: item.id, index}),
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });

    const [{handlerId}, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!itemRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    drag(drop(itemRef));

    const handleDrop = (e) => e.preventDefault();

    const dispatch = useDispatch();

    /** Удаление ингредиента из корзины. */
    const onDelete = (id) => {
        dispatch(deleteIngredient(id));
    }

    return (
        <div ref={itemRef} className={styles.item} style={{opacity}} onDrop={handleDrop} data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => onDelete(item.id)}
            />
        </div>
    )
}

OrderItem.propTypes = {
    item: ingredientType.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired
};

export default OrderItem;