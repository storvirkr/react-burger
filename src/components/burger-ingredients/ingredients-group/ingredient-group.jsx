import React from "react";
import ingredietsGroupStyles from "./ingredient-group.module.css"
import { useSelector} from "react-redux";
import IngredientGroupItem from "../burger-ingredient-item/burger-ingredient-item";
import { openModal } from '../../../services/actions/ingredient-detail'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const IngredientGroup = React.forwardRef((props, ref ) => {
  const data = useSelector(state => state.burgerIngredientReducer.ingredients)
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleIngredientClick = (e) => {
    e.preventDefault();
    navigate(`/ingredient/${ref._id}`, {state: { background: location }})
    dispatch(openModal(ref));
};
  
  return (
    <>
    <p className="text text_type_main-medium" id={props.id} ref={ref}>{props.name}</p>
    <div className={`${ingredietsGroupStyles.item_container} pt-4 pb-4 ` }>
    {data.map((item) => item.type === props.type && <IngredientGroupItem item={item} key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} onClick={handleIngredientClick} />) }
    </div>
        </>
  );
});

export default IngredientGroup;
