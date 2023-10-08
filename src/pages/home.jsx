import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/ingredients";
import { useEffect } from "react";
import Loader from "../components/loading/loading"

export const HomePage = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  const isLoading = useSelector(
    (state) => state.burgerIngredientReducer.ingredientPending
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
    )
  };  
