export const OPEN_MODAL_INGREDIENT = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_MODAL_INGREDIENT = 'CLOSE_INGREDIENT_MODAL'

export const openModal = (ingredient) => {
    return {
        type: OPEN_MODAL_INGREDIENT,
        payload: ingredient
    };
};