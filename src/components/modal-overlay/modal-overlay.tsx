import {FC, HTMLAttributes, MouseEvent} from "react";
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	onClose: () => void;
} & HTMLAttributes<HTMLElement>;

const ModalOverlay: FC<TModalOverlayProps> = ({onClose, children}: TModalOverlayProps) => {
	const onPopupClick = (e: MouseEvent<HTMLDivElement>) => {
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
