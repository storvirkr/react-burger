import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredients-group/ingredient-group";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("bun");
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  let bunsData = ingredients.filter((item) => item.type === "bun");
  let sauceData = ingredients.filter((item) => item.type === "sauce");
  let fillingData = ingredients.filter((item) => item.type === "main");

  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const fillingRef = useRef(null);

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

  const showDetails = useCallback((item) => {
    setCurrentItem(item);
    setVisibleDetails(true);
  }, []);

  const closeDetails = () => {
    setVisibleDetails(false);
  };

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
      >
        <ul className={burgerIngredientsStyle.ingredients_list}>
          <li ref={bunsRef}>
            <IngredientGroup
              ingredients={bunsData}
              name="Булки"
              showDetails={showDetails}
            />
          </li>
        </ul>
        <ul className={burgerIngredientsStyle.ingredients_list}>
          <li ref={sauceRef}>
            <IngredientGroup
              ingredients={sauceData}
              name="Соусы"
              showDetails={showDetails}
            />
          </li>
        </ul>
        <ul className={burgerIngredientsStyle.ingredients_list}>
          <li ref={fillingRef}>
            <IngredientGroup
              ingredients={fillingData}
              name="Начинки"
              showDetails={showDetails}
            />
          </li>
        </ul>
        {visibleDetails && (
          <Modal onClose={closeDetails} title="Детали ингредиента">
            <IngredientDetails ingredients={currentItem} />
          </Modal>
        )}
      </div>
    </section>
  );
};
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
