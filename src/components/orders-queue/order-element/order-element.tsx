import React, {FC} from "react";
import { useAppSelector} from "../../hooks/custom-hook";
import styles from "./order-element.module.css";
import { TItem, TOrder} from "../../../utils/types";
import { v4 as uuid } from 'uuid';

type TOrderElement = {
    order: TOrder;
}

const OrderElement: FC<TOrderElement> = ({order}) => {
    const storeIngredients = useAppSelector((store) => store.burgerIngredientReducer.ingredients);
    const length = order.ingredients.length;
    const slicedImages = order.ingredients.length < 4 ? order.ingredients : order.ingredients.slice(0, 5);

    const getImage = (id: string): string => {
        const ingredientObj = storeIngredients.filter((ingredient: TItem) => ingredient._id === id);
        //@ts-ignore
        return ingredientObj.item
    };

    return (
        <div className={styles.ordersImages}>
            {slicedImages.map((ingredient: string) => (
                <div className={styles.ordersImgBox} key={uuid()}>
                    <div className={`${styles.ordersImgContainer} mr-4`}>
                        <img
                            src={getImage(ingredient)}
                            className={`${styles.ordersCardImg} mr-4`}
                            alt="ingredient_image"
                        />
                    </div>
                </div>
            ))}

            {length > 5 && (
                <div className={styles.ordersImgBox}>
                    <div className={styles.ordersCountContainer}>
                        <p className='text text_type_main-default'>{`+${order.ingredients.slice(5, length).length}`}</p>
                    </div>
                    <div className={`${styles.ordersImgContainer} mr-4`}>
                        <img
                            src={getImage(order.ingredients[5])}
                            className={`${styles.ordersCardImg} mr-4`}
                            alt="ingredient_image"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderElement