import React from "react";
import doneLogo from "../../../images/doneLogo.png"
import OrderDetailStyles from "./order-detail.module.css"

const src = doneLogo;

const OrderDetails = () =>
{
    return(
        <div className={OrderDetailStyles.container}>
        <p className={`text text_type_digits-large pt-15 pb-8`}>155230</p>
        <p className={`text text_type_main-medium pb-8`}>идентификатор заказа</p>
        <img src={src} alt="sucess"/>
        <p className={`text text_type_main-small pt-10 pb-2`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-default text_color_inactive pb-10`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}
export default OrderDetails