import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css'

const ModalOverlay = ({children, onClick}) => {
	return (
		<div className={styles.modal_container} onClick={onClick}>
			{children}
		</div>
	);
}

ModalOverlay.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ModalOverlay;

