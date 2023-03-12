import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import styles from './modal.module.css'

const Modal = ({setActive, children, title}) => {
    const toClose = () => {
        setActive(false);
    }
    const modalRoot = document.getElementById("modals");

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                toClose();
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    return ReactDOM.createPortal(
        <ModalOverlay onClick={toClose}>
            <div className={`${styles.modal_content} pt-10 pr-10 pl-10 pb-15`} onClick={e => e.stopPropagation()}>
                <div className={styles.title}>
                    <div><span className="text text_type_main-medium">{title}</span></div>
                    <div className={styles.close} onClick={toClose}><CloseIcon type="primary"/></div>
                </div>
                {children}
            </div>
        </ModalOverlay>
        ,
        modalRoot
    );
}
export default Modal;