import React from "react";
//import IngredientDetails from "../../burger-ingredients/ingredient-details/ingredient-details";
import ModalOverlayStyles from "./modal-overlay.module.css"

const ModalOverlay = ({children}) => {
    return(
        <div className={ModalOverlayStyles.overlay}>
        {children}
        </div>
        )
}
export default ModalOverlay