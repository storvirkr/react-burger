export const OPEN_MODAL_INGREDIENT = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_MODAL_INGREDIENT = 'CLOSE_INGREDIENT_MODAL'
export const SELECT_INGREDIENT = "SELECT_INGREDIENT"

export const selectIngredient = (idIngredient) => {
    return {
        type: SELECT_INGREDIENT,
        payload: idIngredient
    };
};

export const openModal = (idIngredient) => {
    return {
        type: OPEN_MODAL_INGREDIENT,
        payload: idIngredient
    };
};