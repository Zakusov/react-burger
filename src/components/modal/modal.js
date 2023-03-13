import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById("root");

function Modal({onClose, title, children}) {
    const onKeyDown = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal}>
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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
