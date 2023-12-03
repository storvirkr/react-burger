import React, {FC} from 'react';
import styles from './feed-constructor.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../hooks/custom-hook";
import { TItem } from '../../utils/types';
import { TFeedDetails } from '../../services/services-types/data';
import { formatDate } from '../../utils/datefunc';
import Loader from '../loading/loading';
import FeedElement from './feed-element/feed-element';



const FeedConstructor: FC<TFeedDetails> = ({type}) => {
  const storeIngredients = useAppSelector((store) => store.burgerIngredientReducer.ingredients);
  const feed = useAppSelector((store: any) => store.modalReducer.feedModal.selectedFeed);
  

  const getStatus = (status: string) => {
    if(status === 'done'){
        return 'Выполнен';
    }
    else if (status === 'pending'){
        return 'Готовится';
    }
    else {
        return 'Создан';
    }
    }

  const getTotalPrice = (): number => {
    let total: number = 0;

    feed.ingredients.forEach((ingredient: string) => {
        total += storeIngredients.filter((storeIngredient: TItem) => storeIngredient._id === ingredient)[0].price;
    })

    return total;
};

  return (
    <>
      {feed.ingredients 
        ? (
          <div className={`${styles.order} ${type === 'modal' ? 'ml-10' : ''} mb-10`}>
            <h2 className={`text text_type_digits-default mb-10 ${type === 'page' ? styles.textCenter : ''}`}>#{feed.number}</h2>

            <div className={styles.orderDetails}>
              <h1 className="text text_type_main-medium mb-3">{feed.name}</h1>
              <p className={`${feed.status === 'done' ? styles.orderReady : styles.orderStatus} text text_type_main-default mb-15`}>{getStatus(feed.status)}</p>
            </div>

            <h1 className={`${styles.orderDetails} text text_type_main-medium mb-6`}>Состав:</h1>

            <div className={`${styles.orderContainer} mb-10 pt-2 pb-2`} > 
              <FeedElement feedIngredients={feed.ingredients} />
            </div>

            <div className={styles.orderInfo}>
              <p className={`${styles.orderReady} text text_type_main-default`}>{formatDate(new Date(feed.createdAt))}</p>

              <div className={styles.orderPrice}>
                <h2 className="text text_type_digits-default">{getTotalPrice()}</h2>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </div>
        )
        : <Loader/>
      }
    </>
  )
}

export default FeedConstructor;