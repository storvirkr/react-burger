import { useEffect, useCallback, ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from "./modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
  title: string;
  children: ReactNode;
  closeHandler: () => void;
}

const Modal: React.FC<IModal> = ({ title, children, closeHandler }) => {

  const handleEscape = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
        closeHandler();
    }
}, []);

useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
        document.removeEventListener('keydown', handleEscape);
    };
}, [handleEscape]);
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={closeHandler} />
      <div className={ModalStyles.modal}>
        <div
          className={
            title
              ? ModalStyles.header_with_title
              : ModalStyles.header_without_title
          }
        >
          {title && <p className="text text_type_main-large">{title}</p>}
          <span className={ModalStyles.close_icon}>
            <CloseIcon onClick={closeHandler} type="primary"/>
          </span>
        </div>
        {children}
      </div>
    </>,

    modalRoot
  );
};



export default Modal;