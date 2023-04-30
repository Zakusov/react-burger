import {FC, HTMLAttributes, MouseEvent} from "react";
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

export default ModalOverlay;
