import React from "react";
import IngredientDetailStyles from "./ingredient-details.module.css";

const IngredientDetails = ({ ingredients }) => {
  return (
    <div className={IngredientDetailStyles.container}>
      <img src={ingredients.image} alt={ingredients.name} />
      <p className={`text text_type_main-medium pb-8`}>{ingredients.name}</p>
      <div className={IngredientDetailStyles.data}>
        <div className={IngredientDetailStyles.data_item_cal}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredients.calories}
          </p>
        </div>
        <div className={IngredientDetailStyles.data_item_prot}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredients.proteins}
          </p>
        </div>
        <div className={IngredientDetailStyles.data_item_fat}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredients.fat}
          </p>
        </div>
        <div className={IngredientDetailStyles.data_item_carb}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredients.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
