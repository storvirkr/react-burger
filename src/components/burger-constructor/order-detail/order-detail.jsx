import React from "react"

import styles from './order-detail.module.css'
import {useSelector} from "react-redux";
import Loader from "../../loading/loading";
import doneLogo from "../../../images/doneLogo.png"


const OrderDetails = () => {
    const orderModal = useSelector(store => store.modalReducer.orderModal)

    return (
        <div className={styles.container}>
            {orderModal.isLoading && !orderModal.isFailed && (
                <div className={styles.module__isLoading} >
                  <Loader />               
                         </div>)
            }

            {orderModal.isLoading && orderModal.isFailed && (
                <div className={styles.container} >
                    <h1 className="text text_type_main-medium text_color_inactive">Ошибка!</h1>
                    <h1 className="text text_type_main-medium text_color_inactive">Повторите запрос</h1>
                </div>)
            }

            {!orderModal.isLoading && !orderModal.isFailed && (
                <>
                    <h1 className={styles.container + " text text_type_digits-large mt-6"}>{orderModal.orderId}</h1>
                    <p className="text text_type_main-medium mt-8" >идентификатор заказа</p>

                    <div className={styles.container + ' mt-15 mb-15'}>
                        <img className="m-2" src={doneLogo} alt="Done tick" />
                    </div>

                    <p className="text text_type_main-default mb-2" >Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive mb-30" >Дождитесь готовности на орбитальной станции</p>
                </>
            )}
        </div>
    );
};

export default OrderDetails;