import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
	const onPopupClick = (e) => {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
	};

	return (
		<div className={styles.popup} onClick={onPopupClick}>
			{props.children}
		</div>
	);
}

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
};

export default ModalOverlay;
