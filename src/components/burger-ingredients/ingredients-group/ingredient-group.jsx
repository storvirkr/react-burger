import React from "react";
import ingredietsGroupStyles from "./ingredient-group.module.css";
import { useSelector } from "react-redux";
import IngredientGroupItem from "../burger-ingredient-item/burger-ingredient-item";


const IngredientGroup = React.forwardRef((props, ref) => {
  const data = useSelector(
    (state) => state.burgerIngredientReducer.ingredients
  );
 

  return (
    <>
      <p className="text text_type_main-medium" id={props.id} ref={ref}>
        {props.name}
      </p>
      <div className={`${ingredietsGroupStyles.item_container} pt-4 pb-4 `}>
        {data.map(
          (item) =>
            item.type === props.type && (
             
              <IngredientGroupItem
                item={item}
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            )
        )}
      </div>
    </>
  );
});

export default IngredientGroup;
