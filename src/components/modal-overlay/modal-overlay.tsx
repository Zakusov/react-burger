import {FC, HTMLAttributes, MouseEvent, useState} from "react";
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	onClose: () => void;
} & HTMLAttributes<HTMLElement>;

const ModalOverlay: FC<TModalOverlayProps> = ({onClose, children}: TModalOverlayProps) => {
    const [zIndex, setZIndex] = useState(100);

    const onPopupClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setZIndex(-1);
            onClose();
        }
    };

    return (
        <div className={styles.popup} onClick={onPopupClick} style={{zIndex: zIndex}}>
            {children}
        </div>
    );
}

export default ModalOverlay;
