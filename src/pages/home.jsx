import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/ingredients";
import { useEffect } from "react";
import styles from "../../src/components/app/app.module.css";

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
            <div className={styles.Loader}>
              <Loader />
            </div>
          ) : (
              <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    )}
    </>
    )
  };  

  const Loader = () => {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  };