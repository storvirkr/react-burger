import React, {  useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredients-group/ingredient-group";
import { Outlet } from "react-router-dom";

export const ref = HTMLDivElement;


const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");
  


  const bunsRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const fillingRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);

  const handleTabs = () => {
    const tabsBlock = tabRef.current?.offsetTop;
    const bunsRect = bunsRef.current?.getBoundingClientRect().top;
    const sauceRect = sauceRef.current?.getBoundingClientRect().top;
    const fillingRect = fillingRef.current?.getBoundingClientRect().top;

    // @ts-ignore
    if (tabsBlock > bunsRect && tabsBlock <= sauceRect) {
      setCurrent("bun");
      // @ts-ignore
    } else if (tabsBlock > sauceRect && tabsBlock <= fillingRect) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };

  const selectGroup = (name: string) => {
    setCurrent(name);

    if (name === "bun") {
      bunsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (name === "sauce") {
      sauceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (name === "main") {
      fillingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  
  return (
    <>
    <section className={`${burgerIngredientsStyle.burgerIngredients} pt-10`}>
      <p className={`text text_type_main-large  pt-10 pb-5`}>Соберите бургер</p>
      <div
        className={`${burgerIngredientsStyle.burger_ingredients_tabs} mb-10 pb-40`}
      >
        <Tab value="bun" active={current === "bun"} onClick={selectGroup}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={selectGroup}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={selectGroup}>
          Начинки
        </Tab>
      </div>
      <div
        className={`${burgerIngredientsStyle.ingredientGroup} custom-scroll`}
        onScroll={handleTabs}
      >
        
        <ul className={burgerIngredientsStyle.ingredients_list} 
        // @ts-ignore
        ref={tabRef}>
          <li 
          // @ts-ignore
          ref={bunsRef}>
            <IngredientGroup type="bun" name="Булки" />
          </li>
        </ul>
        <ul className={burgerIngredientsStyle.ingredients_list}>
          <li 
          // @ts-ignore
          ref={sauceRef}>
            <IngredientGroup type="sauce" name="Соусы" />
          </li>
        </ul>
        <ul className={burgerIngredientsStyle.ingredients_list}>
          <li 
          // @ts-ignore
          ref={fillingRef}>
            <IngredientGroup type="main" name="Начинки" />
          </li>
        </ul>
      </div>
    </section>
    <Outlet />
    </>
  );
};


export default BurgerIngredients;
