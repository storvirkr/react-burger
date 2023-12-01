import React, {FC, useEffect, useState} from 'react';
import styles from './feed-element.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks/custom-hook";
import { TItem } from '../../../utils/types';
import { v4 as uuid } from 'uuid';

type TFeedElement = {
  feedIngredients: Array<string>;
}

type TAmount = {
  [key: string]: number
}


 const FeedElement: FC<TFeedElement> = ({feedIngredients}) => {
    const storeIngredients = useAppSelector((store) => store.burgerIngredientReducer.ingredients);
    const [ingredients, setIngredients] = useState<Array<TItem> | []>([]);
    const [amount, setAmount] = useState<TAmount>({})
  
    useEffect(() => {
      const newIngredientsArr: Array<TItem> = getIngredients(feedIngredients);
      const uniqeIngredientsArr: Array<TItem> = deleteDuplicates(newIngredientsArr);
  
      countAmount(newIngredientsArr);
      setIngredients(uniqeIngredientsArr);
    }, []);
  
    const getIngredients = (arr: Array<string>) => {
      const ingredientsArr: Array<TItem> = []
  
      arr.forEach((ingredient: string) => {
        const ingredientObj: Array<TItem> = storeIngredients.filter((storeIngredient: TItem) => 
          storeIngredient._id === ingredient
        );
  
        ingredientsArr.push(ingredientObj[0]);
      });
  
      return ingredientsArr;
    };
  
    const deleteDuplicates = (arr: Array<TItem>) => {
      const uniqeIngredientsArr = arr.filter(function(item, index) {
        return arr.indexOf(item) === index;
      });
      return uniqeIngredientsArr;
    }
  
    const countAmount = (arr: Array<TItem>) => {
      const counts: TAmount = {};
      arr.forEach(function (x, index) {
        counts[x._id] = (counts[x._id] || 0) + 1;
      });
      setAmount(counts);
    };
    
    return (
      <>
        {ingredients.map((storeIngredient: TItem, index: number) => (
          <div className={styles.orderCard} key={uuid()}>
            <div className={styles.orderCardTitle}>
              <div className={`${styles.orderImgContainer} mr-4`}>
                <img 
                  src={storeIngredient.image} 
                  className={`${styles.orderCardImg} mr-4`} 
                  alt="ingredient_image" 
                />
              </div>
              <p className='text text_type_main-default'>{storeIngredient.name}</p>
            </div>
  
            <div className={styles.orderPrice}>
              <h2 className="text text_type_digits-default">{amount[storeIngredient._id]} x </h2>
              <h2 className="text text_type_digits-default">{storeIngredient.price}</h2>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        ))}
      </>
    )
  };

  export default FeedElement