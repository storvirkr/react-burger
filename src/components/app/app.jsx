import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerComponents from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  const isLoading = useSelector(
    (state) => state.burgerIngredientReducer.ingredientPending
  );

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      {isLoading ? (
        <div className={styles.Loader}>
        <Loader />
        </div>
      ) : (
        <main className={styles.main_container}>
          <DndProvider backend={HTML5Backend}>
            <div className={styles.burger_ingredients}>
              <BurgerIngredients />
            </div>
            <div className={styles.burger_constructor}>
              <BurgerComponents />
            </div>
          </DndProvider>
        </main>
      )}
    </div>
  );
}
const Loader = () => {
  return (
    <div>
      <h1>Loading...</h1>;
    </div>
  );
};

export default App;
