import React, { FC, FormEvent } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredietsItemStyles from "./burger-ingredient-item.module.css";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { openModal } from '../../../services/actions/modal'
import { TIngredientGroupItem, TItem } from "../../../utils/types";



const IngredientGroupItem: FC<TIngredientGroupItem> = ({ name, image, price, id, item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  let count = 0;
  const buns = useSelector((state: any) => state.burgerConstructorReducer.bun);
  const filling = useSelector(
    (state: any) => state.burgerConstructorReducer.ingredients
  );
  filling.forEach((element: TItem) => {
    if (item._id === element._id) {
      count++;
    }
  });
  if (buns._id === item._id) {
    count+=2;
  }

  const [, dragRef] = useDrag({
    type: "item",
    item: { item },
  });
  const location = useLocation();

  const ingredientId = item['_id'];
  const handleIngredientClick = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/ingredient/${ingredientId}`, {state: { background: location }})
    dispatch(openModal(item));
    console.log(item['_id'])
};

  return (
    <>
      <div
        ref={dragRef}
        className={`${ingredietsItemStyles.item_container} pt-4 pl-4`}
        onClick={handleIngredientClick}
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

export default IngredientGroupItem;
