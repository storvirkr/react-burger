import ModalOverlayStyles from "./modal-overlay.module.css";

type TModalOverlay ={
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: TModalOverlay) => {
  return <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>;
};
export default ModalOverlay;
