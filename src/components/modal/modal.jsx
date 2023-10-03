import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from "./modal.module.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL_INGREDIENT} from "../../services/actions/ingredient-detail";
import { CLOSE_MODAL_ORDER } from "../../services/actions/order";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ title, children, closeModal}) => {

  const dispatch = useDispatch()
  const onClose = () => {
     dispatch(CLOSE_MODAL_INGREDIENT)
     dispatch(CLOSE_MODAL_ORDER)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
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
            <CloseIcon onClick={onClose} type="primary"/>
          </span>
        </div>
        {children}
      </div>
    </>,

    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
