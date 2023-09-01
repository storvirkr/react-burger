import React from "react";
import { DeleteIcon, DragIcon, CurrencyIcon, LockIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorItemStyle from "./burger-constructor-item.module.css"
import PropTypes from "prop-types"
import { ingredientPropTypes } from "../../../utils/types";


const ConstructorItem = ({ingredients, isLocked, name}) =>{
    
return(
    <ul className={!isLocked ? (burgerConstructorItemStyle.item_list) : null}>
        {ingredients.map((item) =>(
            <li className={ !isLocked ? (burgerConstructorItemStyle.item) : (`${burgerConstructorItemStyle.item_fixed} pl-15 `)} key={item._id}>
                 {!isLocked ? (<DragIcon type="primary" />) : null}
                <img className={burgerConstructorItemStyle.resize} src={item.image} alt={item.name}/>
                <p className={`text text_type_main-default pt-4 pb-4 pl-5 pr-5`}>{name ? (item.name + name) : item.name}</p>
                <p className="text text_type_digits-default">{item.price}</p><span><CurrencyIcon type="primary" /></span>
                {!isLocked ? (<span><DeleteIcon type="primary" /></span>) : <span><LockIcon type="secondary" /></span>}
            </li>
        )) }
        </ul>
)
}

ConstructorItem.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  };
export default ConstructorItem