import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/custom-hook";
import styles from "./orders-queue.module.css";
import {IOrdersList, TItem, TOrder} from "../../utils/types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from "react-router";
import { openFeedModal } from "../../services/actions/modal";
import { formatDate } from "../../utils/datefunc";
import OrderElement from "./order-element/order-element";


const OrdersQueue: FC<IOrdersList> = ({type, order}) => {
    const storeIngredients = useAppSelector((store) => store.burgerIngredientReducer.ingredients);
    
    const [status, setStatus] = useState<'' | 'Выполнен' | 'Готовится' | 'Создан'>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleOrderClick = () => {
        dispatch(openFeedModal(order));
        type === 'feed' 
        ? navigate(`/feed/${order._id}`, {state: { background: location }}) 
        : navigate(`/profile/orders/${order._id}`, {state: { background: location }});
    };

    const getTotalPrice = (): number | string => {
        let total: number = 0;
        let error: boolean = false;

        if (storeIngredients.length > 0 && order.ingredients.length > 0) {
            order.ingredients.forEach((ingredient: string) => {
                if (ingredient) {
                    total += storeIngredients.filter((storeIngredient: TItem) =>
                    storeIngredient._id === ingredient)[0].price;
                }
                if (!ingredient) {
                    error = true;
                }
            });
        }

        if (error) {
            return 'Ошибка'
        }

        return total;
    };

    const getStatus = (status: string) => {
        if(status === 'done'){
            setStatus('Выполнен');
        }
        else if (status === 'pending'){
            setStatus('Готовится');
        }
        else {
            setStatus('Создан');
        }
        }

    useEffect(() => {
        getStatus(order.status);
    }, []);

    return (
        <div className={styles.ordersCard} onClick={handleOrderClick}>
            <div className={`${styles.ordersInfo}`}>
                <h3 className="text text_type_digits-default">#{order.number}</h3>
                <p className="text text_type_main-default text_color_inactive">{formatDate(new Date(order.createdAt))}</p>
            </div>

            <div className={`${styles.orderstitle} ${styles.type}`}>
                <h2 className={`text text_type_main-medium ${type === 'profile' ? 'mb-2': ''}`}>{order.name}</h2>
                {type === 'profile' && (
                    <p 
                        className={`${status === 'Выполнен' ? styles.ordersTextReady : ''} text text_type_main-default`}
                    >
                        {status}
                    </p>
                )}
            </div>

            <div className={styles.ordersList}>
                <div>
                    <OrderElement order={order} />
                </div>

                <div className={styles.ordersPrice}>
                    <h2 className="text text_type_digits-default">{getTotalPrice()}</h2>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default OrdersQueue;