import ModalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>;
};
export default ModalOverlay;
