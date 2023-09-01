import React from "react";
import ModalOverlayStyles from "./modal-overlay.module.css"

const ModalOverlay = ({children, onClose}) => {
    
    return(
        <div className={ModalOverlayStyles.overlay}>
        {children}
        </div>
        )
}
export default ModalOverlay