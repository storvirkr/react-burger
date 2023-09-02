import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/types";
import ingredietsGroupStyles from "./ingredient-group.module.css";

const IngredientGroup = ({ ingredients, name, showDetails }) => {
  return (
    <>
      <p className="text text_type_main-medium">{name}</p>
      <ul className={`${ingredietsGroupStyles.item_container} pt-4 pb-4 pl-4`}>
        {ingredients.map((item, index) => (
          <li
            onClick={() => showDetails(item)}
            className={ingredietsGroupStyles.item}
            key={item._id}
          >
            <img src={item.image} alt={item.name} />
            <p className={`text text_type_digits-default pt-1 pb-1`}>
              {item.price}
            </p>
            <span>
              <CurrencyIcon type="primary" />
            </span>
            <p className={`text text_type_main-default pb-8`}>{item.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
export default IngredientGroup;
