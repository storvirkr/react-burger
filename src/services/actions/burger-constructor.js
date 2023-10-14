export const ADD_ITEM_TO_CONSTRUCTOR = 'ADD_ITEM_TO_CONSTRUCTOR'
export const DELETE_ITEM_FROM_CONSTRUCTOR = 'DELETE_ITEM_FROM_CONSTRUCTOR'
export const SORT_ITEMS = 'SORT_ITEMS'
export const RESET_CART = 'RESET_CART';
export const resetCart = () => {
    return {
      type: RESET_CART
    };
  };
