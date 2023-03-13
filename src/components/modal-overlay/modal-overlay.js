import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({onClose, children}) {
	const onPopupClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className={styles.popup} onClick={onPopupClick}>
			{children}
		</div>
	);
}

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
};

export default ModalOverlay;
