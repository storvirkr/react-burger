import React, { useCallback, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredients-group/ingredient-group";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");

  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const fillingRef = useRef(null);
  const tabRef = useRef(null);

  const handleTabs = () => {
    const tabsBlock = tabRef.current.offsetTop;
    const bunsRect = bunsRef.current.getBoundingClientRect().top;
    const sauceRect = sauceRef.current.getBoundingClientRect().top;
    const fillingRect = fillingRef.current.getBoundingClientRect().top;

    if (tabsBlock > bunsRect && tabsBlock <= sauceRect) {
      setCurrent("bun");
    } else if (tabsBlock > sauceRect && tabsBlock <= fillingRect) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };

  const selectGroup = (name) => {
    setCurrent(name);

    if (name === "bun") {
      bunsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (name === "sauce") {
      sauceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    if (name === "main") {
      fillingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const isOpened = useSelector((state) => state.objectIngredient.isOpened);

  return (
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
        <ul className={burgerIngredientsStyle.ingredients_list} ref={tabRef}>
          <li ref={bunsRef}>
            <IngredientGroup type="bun" name="Булки" />
          </li>
        </ul>
        <ul className={burgerIngredientsStyle.ingredients_list}>
          <li ref={sauceRef}>
            <IngredientGroup type="sauce" name="Соусы" />
          </li>
        </ul>
        <ul className={burgerIngredientsStyle.ingredients_list}>
          <li ref={fillingRef}>
            <IngredientGroup type="main" name="Начинки" />
          </li>
        </ul>
        {isOpened && (
          <Modal title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        )}
      </div>
    </section>
  );
};
// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
// };

export default BurgerIngredients;
