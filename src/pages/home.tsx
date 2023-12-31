import React, {FC} from "react";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

import Loader from "../components/loading/loading";

export const HomePage: FC  = () => {
 
  const isLoading = useSelector(
    
    (state: any) => state.burgerIngredientReducer.isLoading
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </>
  );
};
