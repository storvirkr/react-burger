import React from "react";
import IngredientDetailStyles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
 
  const ingredient = useSelector(store => store.modalReducer.ingredientModal.selectedIngredient);

  return (
    <div className={IngredientDetailStyles.container}>
      <img src={ingredient.image} alt={ingredient.name} />
      <p className={`text text_type_main-medium pb-8`}>{ingredient.name}</p>
      <div className={IngredientDetailStyles.data}>
        <div className={IngredientDetailStyles.data_item_cal}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={IngredientDetailStyles.data_item_prot}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={IngredientDetailStyles.data_item_fat}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={IngredientDetailStyles.data_item_carb}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
      
  );
};

export default IngredientDetails;
