import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredietsItemStyles from "./burger-ingredient-item.module.css";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { OPEN_MODAL_INGREDIENT } from "../../../services/actions/ingredient-detail";

const IngredientGroupItem = ({ name, image, price, id, item }) => {
  const dispatch = useDispatch();

  const showIngredientDetails = () => {
    dispatch({ type: OPEN_MODAL_INGREDIENT, idIngredients: id });
  };
  let count = 0;
  const buns = useSelector((state) => state.burgerConstructorReducer.bun);
  const filling = useSelector(
    (state) => state.burgerConstructorReducer.ingredients
  );
  filling.forEach((element) => {
    if (item._id === element._id) {
      count++;
    }
  });
  if (buns._id === item._id) {
    count++;
    count++;
  }

  const [, dragRef] = useDrag({
    type: "item",
    item: { item },
  });

  return (
    <>
      <div
        ref={dragRef}
        onClick={() => {
          showIngredientDetails();
        }}
        className={`${ingredietsItemStyles.item_container} pt-4 pb-4 pl-4`}
      >
        <div className={ingredietsItemStyles.counter_item}>
          <Counter count={count} />
        </div>
        <img src={image} alt={name} />
        <p className={`text text_type_digits-default pt-1 pb-1`}>{price}</p>
        <span>
          <CurrencyIcon type="primary" />
        </span>
        <p className={`text text_type_main-default pb-8`}>{name}</p>
      </div>
    </>
  );
};
IngredientGroupItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default IngredientGroupItem;
