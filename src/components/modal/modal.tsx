import {FC, HTMLAttributes, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById("modals")!;

type TModalProps = {
    onClose: () => void;
    title: string;
} & HTMLAttributes<HTMLElement>;

const Modal: FC<TModalProps> = ({onClose, title, children}: TModalProps) => {

    type KeyDownCallback = (event: KeyboardEvent) => void;
    const onKeyDown = useCallback<KeyDownCallback>((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal} data-id="modal">
                <div className={`${styles.header} pt-10 pr-10 pl-10`}>
                    <p className="text text_type_main-large">{title}</p>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
}

export default Modal;
