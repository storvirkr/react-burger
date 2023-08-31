import React from "react";
import { DeleteIcon, DragIcon, CurrencyIcon, LockIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorItemStyle from "./burger-constructor-item.module.css"


const ConstructorItem = ({ingredients, isLocked}) =>{
    
return(
    <ul >
        {ingredients.map((item, index) =>(
            <li className={ !isLocked ? (burgerConstructorItemStyle.item) : (`${burgerConstructorItemStyle.item} pl-15 `)} key={index}>
                 {!isLocked ? (<DragIcon type="primary" />) : null}
                <img className={burgerConstructorItemStyle.resize} src={item.image} alt={item.name}/>
                <p className={`text text_type_main-default pt-4 pb-4 pl-5 pr-5`}>{item.name}</p>
                <p className="text text_type_digits-default">{item.price}</p><span><CurrencyIcon type="primary" /></span>
                {!isLocked ? (<span><DeleteIcon type="primary" /></span>) : <span><LockIcon type="secondary" /></span>}
            </li>
        )) }
        </ul>
)
}
export default ConstructorItem