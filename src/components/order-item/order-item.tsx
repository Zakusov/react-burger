import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {Identifier} from 'dnd-core';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {deleteIngredient} from "../../services/actions";
import {useDispatch} from "../../services/hooks";
import {SelectedIngredientType} from "../../services/types";
import styles from "./order-item.module.css";

interface IOrderItemProps {
    item: SelectedIngredientType;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface IDragItem {
    id: string;
    index: number;
}

interface IHandler {
    handlerId: Identifier | null;
}

const OrderItem = ({item, index, moveCard}: IOrderItemProps) => {

    const itemRef = useRef<HTMLDivElement>(null);

    const [{opacity}, drag] = useDrag({
        type: 'component',
        item: (): IDragItem => ({id: item.id, index}),
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });

    const [{handlerId}, drop] = useDrop<IDragItem, unknown, IHandler>({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item: IDragItem, monitor) {
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
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
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

    const handleDrop = (e: any) => e.preventDefault();

    const dispatch = useDispatch();

    /** Удаление ингредиента из корзины. */
    const onDelete = (id: string) => {
        dispatch(deleteIngredient(id));
    }

    return (
        <div ref={itemRef} className={styles.container} style={{opacity}} onDrop={handleDrop}
             data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement
                extraClass={styles.item}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => onDelete(item.id)}
            />
        </div>
    )
}

export default OrderItem;